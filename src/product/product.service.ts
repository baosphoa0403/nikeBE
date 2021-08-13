import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { Color } from 'src/color/entities/color.entity';
import { StatusEnum } from 'src/common/status.enum';
import { Gender } from 'src/gender/entities/gender.entity';
import { Image } from 'src/image/entities/image.entity';
import { ImageService } from 'src/image/image.service';
import { Size } from 'src/size/entities/size.entity';
import { Status } from 'src/status/entities/status.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateUpdateProductDetailDto } from './dto/create-update-product-detail.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDetail } from './entities/product-detail.entity';
import { Product } from './entities/product.entity';
import { Quantity } from './entities/quantity.entity';
import { ProductResponse } from './response/product';
import { ProductDetailResponse } from './response/product-detail';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(ProductDetail.name)
    private productDetailModel: Model<ProductDetail>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Status.name) private statusModel: Model<Status>,
    @InjectModel(Color.name) private colorModel: Model<Color>,
    @InjectModel(Gender.name) private genderModel: Model<Gender>,
    @InjectModel(Size.name) private sizeModel: Model<Size>,
    @InjectModel(Image.name) private imageModel: Model<Image>,
    private imageService: ImageService,
    @InjectModel(Quantity.name) private quantityModel: Model<Quantity>,
  ) {}

  async findStatusWithName(name: string): Promise<Status> {
    return await this.statusModel
      .findOne({
        nameStatus: name,
      })
      .catch(() => {
        throw new BadRequestException('something wrong');
      });
  }

  //product
  async findWithFilter(filter: ProductFilterDto) {
    const activeStatus = await this.findStatusWithName(StatusEnum.Active);
    // const products = await this.productModel.find({
    //   name: new RegExp('.*' + filter.name ? filter.name : '' + '.*'),
    // });
    const products = await this.productModel.find({
      name: {
        $regex: new RegExp('.*' + filter.name ? filter.name : '' + '.*'),
        $options: 'i',
      },
    });

    const genders = filter.genderId
      ? await this.genderModel.find({
          _id: { $in: filter.genderId },
        })
      : await this.genderModel.find();

    const colors = filter.colorId
      ? await this.colorModel.find({ _id: { $in: filter.colorId } })
      : await this.colorModel.find();

    const sizes = filter.sizeId
      ? await this.sizeModel.find({ _id: { $in: filter.sizeId } })
      : await this.sizeModel.find();

    const details = await this.productDetailModel
      .find(
        {
          product: { $in: products },
          gender: { $in: genders },
          color: { $in: colors },
          status: activeStatus,
        },
        { __v: 0 },
      )
      .populate('product', { __v: 0 })
      .populate('gender', { __v: 0 })
      .populate('color', { __v: 0 });

    const result: ProductResponse[] = [];
    for (const detail of details) {
      const tmp: ProductResponse = result.find(
        (item) => item.product === detail.product,
      );
      if (tmp) {
        const images = await this.imageModel.find(
          { idShoesDetail: detail },
          { __v: 0 },
        );
        const quantities = await this.quantityModel.find(
          {
            productDetail: detail,
          },
          { __v: 0 },
        );
        tmp.details.push({
          info: detail.depopulate('product'),
          quantities: quantities,
          images: images,
        });
      } else {
        const images = await this.imageModel.find(
          { idShoesDetail: detail },
          { __v: 0 },
        );
        const quantities = await this.quantityModel.find(
          {
            productDetail: detail,
          },
          { __v: 0 },
        );
        result.push({
          product: detail.product,
          details: [
            {
              info: detail.depopulate('product'),
              quantities: quantities,
              images: images,
            },
          ],
        });
      }
    }

    return result;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, categoryId, createDate } = createProductDto;
    const category = await this.categoryModel.findById(categoryId);
    if (!category) throw new NotFoundException('category not existed');

    const product = new this.productModel({ name, category, createDate });
    return (await product.save()).populate('category');
  }

  async getAllProduct(): Promise<Product[]> {
    const activeStatus = await this.findStatusWithName(StatusEnum.Active);
    const products = await this.productModel
      .find({}, { __v: 0 })
      .populate('category', { __v: 0 });
    return products;
  }

  async findOne(idProduct: string): Promise<Product> {
    const product = await this.productModel
      .findById(idProduct, { __v: 0 })
      .populate('category', { __v: 0 });
    if (!product) throw new NotFoundException('product not existed');
    return product;
  }

  async updateProduct(
    idProduct: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { name, categoryId } = updateProductDto;
    const category = await this.categoryModel.findById(categoryId);
    if (!category) throw new NotFoundException('category not existed');
    const product = this.productModel
      .findByIdAndUpdate(
        idProduct,
        { name, category },
        { new: true, runValidators: true },
      )
      .populate('category', { __v: 0 });
    return product;
  }

  async deleteProduct(idProduct: string): Promise<string> {
    const product = await this.productModel.findById(idProduct);
    if (!product) throw new NotFoundException('product not existed');
    const inActiveStatus = await this.findStatusWithName(StatusEnum.Inactive);
    await this.productDetailModel.updateMany(
      { product },
      { status: inActiveStatus },
    );
    return `delete product ${idProduct} successful`;
  }

  //product detail
  async insertDetail(
    idProduct: string,
    createProductDetailDto: CreateUpdateProductDetailDto,
  ): Promise<ProductDetailResponse> {
    const { statusId, colorId, genderId, imageUrls, quantities } =
      createProductDetailDto;

    const product = await this.findOne(idProduct);

    const status = await this.statusModel.findById(statusId);
    if (!status) throw new NotFoundException('status not existed');

    const color = await this.colorModel.findById(colorId);
    if (!color) throw new NotFoundException('color not existed');

    const gender = await this.genderModel.findById(genderId);
    if (!gender) throw new NotFoundException('gender not existed');

    const response = new ProductDetailResponse();
    //create a detail
    const productDetail = await new this.productDetailModel({
      product,
      status,
      color,
      gender,
    })
      .save()
      .catch(() => {
        throw new BadRequestException('Insert detail not success');
      });
    response.info = productDetail.depopulate('product');

    //create images for detail
    for (const url of imageUrls) {
      const img = await this.imageService.create({
        urlImage: url,
        idShoesDetail: productDetail._id,
      });

      if (!response.images) response.images = [];
      response.images.push(img.depopulate('idShoesDetail'));
    }

    //create quantity (size, price) for detail
    for (const quantity of quantities) {
      const size = await this.sizeModel.findById(quantity.sizeId).catch(() => {
        throw new BadRequestException('Insert detail not success');
      });

      if (!size) throw new BadRequestException('Insert detail not success');

      const quantityEntity = await new this.quantityModel({
        quantity: quantity.quantity,
        size: size,
        price: quantity.price,
        productDetail: productDetail,
      })
        .save()
        .catch(() => {
          throw new NotFoundException('Insert detail not success');
        });
      if (!response.quantities) response.quantities = [];
      response.quantities.push(quantityEntity.depopulate('productDetail'));
    }

    return response;
  }

  async getAllProductDetail(
    idProduct: string,
  ): Promise<ProductDetailResponse[]> {
    const product = await this.findOne(idProduct);
    const activeStatus = await this.findStatusWithName(StatusEnum.Active);
    const response = [];
    const productDetails = await this.productDetailModel
      .find({ product: product, status: activeStatus }, { __v: 0 })
      .populate('status', { __v: 0 })
      .populate('color', { __v: 0 })
      .populate('gender', { __v: 0 });
    for (const detail of productDetails) {
      const quantities = await this.quantityModel.find(
        {
          productDetail: detail,
          quantity: { $gt: 0 },
        },
        { __v: 0 },
      );
      if (quantities.length > 0) {
        const images = await this.imageModel.find(
          { idShoesDetail: detail },
          { __v: 0 },
        );
        response.push({ info: detail, quantities, images });
      }
    }
    return response;
  }

  async updateProductDetail(
    idProductDetail: string,
    updateProductDetailDto: CreateUpdateProductDetailDto,
  ): Promise<ProductDetailResponse> {
    const { statusId, colorId, genderId, imageUrls, quantities } =
      updateProductDetailDto;

    const status = await this.statusModel.findById(statusId);
    if (!status) throw new NotFoundException('status not existed');

    const color = await this.colorModel.findById(colorId);
    if (!color) throw new NotFoundException('color not existed');

    const gender = await this.genderModel.findById(genderId);
    if (!gender) throw new NotFoundException('gender not existed');

    const response = new ProductDetailResponse();

    //update productDetail
    const productDetail = await this.productDetailModel.findByIdAndUpdate(
      { _id: idProductDetail },
      {
        status: status,
        color: color,
        gender: gender,
      },
    );
    response.info = productDetail;
    //update images for detail
    if (imageUrls.length > 0) {
      await this.imageModel.deleteMany({ idShoesDetail: productDetail });
      for (const url of imageUrls) {
        const img = await this.imageService.create({
          urlImage: url,
          idShoesDetail: productDetail._id,
        });

        if (!response.images) response.images = [];
        response.images.push(img.depopulate('idShoesDetail'));
      }
    }

    //update quantity (size, price) for detail
    if (quantities.length > 0) {
      await this.quantityModel.deleteMany({ productDetail: productDetail });
      for (const quantity of quantities) {
        const size = await this.sizeModel
          .findById(quantity.sizeId)
          .catch(() => {
            throw new BadRequestException('Update detail failed');
          });

        if (!size) throw new BadRequestException('Update detail failed');

        const quantityEntity = await new this.quantityModel({
          quantity: quantity.quantity,
          size: size,
          price: quantity.price,
          productDetail: productDetail,
        })
          .save()
          .catch(() => {
            throw new NotFoundException('Insert detail not success');
          });
        if (!response.quantities) response.quantities = [];
        response.quantities.push(quantityEntity.depopulate('productDetail'));
      }
    }

    return response;
  }

  async deleteProductDetail(idProductDetail: string): Promise<string> {
    const inActiveStatus = await this.findStatusWithName(StatusEnum.Inactive);
    const productDetail = await this.productDetailModel.findByIdAndUpdate(
      { _id: idProductDetail },
      { status: inActiveStatus },
    );

    if (!productDetail)
      throw new NotFoundException('product detail not existed');

    return `delete product detail ${idProductDetail} successful`;
  }
}
