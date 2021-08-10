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
import { Size } from 'src/size/entities/size.entity';
import { Status } from 'src/status/entities/status.entity';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDetail } from './entities/product-detail.entity';
import { Product } from './entities/product.entity';
import { ProductResponse } from './response/product';

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
  ) {}

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
      .find({
        product: { $in: products },
        gender: { $in: genders },
        color: { $in: colors },
        size: { $in: sizes },
        quantity: { $gt: 0 },
        status: activeStatus,
      })
      .populate('product')
      .populate('gender')
      .populate('size')
      .populate('color');

    const result: ProductResponse[] = [];
    details.forEach((detail) => {
      const tmp: ProductResponse = result.find(
        (item) => item.product === detail.product,
      );
      if (tmp) {
        tmp.details.push(detail.depopulate('product'));
      } else {
        result.push({
          product: detail.product,
          details: [detail.depopulate('product')],
        });
      }
    });

    return result;
  }

  async findStatusWithName(name: string): Promise<Status> {
    return await this.statusModel
      .findOne({
        nameStatus: name,
      })
      .catch(() => {
        throw new BadRequestException('something wrong');
      });
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
    const products = await this.productModel.find().populate('category');

    const result = [];
    for (const product of products) {
      const details = await this.productDetailModel.find({
        product,
        status: activeStatus,
        quantity: { $gt: 0 },
      });
      if (details.length > 0) {
        console.log(details);

        result.push(product);
      }
    }
    return result;
  }

  async findOne(idProduct: string): Promise<Product> {
    const product = await this.productModel
      .findById(idProduct)
      .populate('category');
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
      .populate('category');
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

  async insertDetail(
    idProduct: string,
    createProductDetailDto: CreateProductDetailDto,
  ): Promise<ProductDetail> {
    const { statusId, colorId, genderId, price, quantity, sizeId } =
      createProductDetailDto;
    const product = await this.findOne(idProduct);

    const status = await this.statusModel.findById(statusId);
    if (!status) throw new NotFoundException('status not existed');

    const color = await this.colorModel.findById(colorId);
    if (!color) throw new NotFoundException('color not existed');

    const gender = await this.genderModel.findById(genderId);
    if (!gender) throw new NotFoundException('gender not existed');

    const size = await this.sizeModel.findById(sizeId);
    if (!size) throw new NotFoundException('size not existed');

    const productDetail = await new this.productDetailModel({
      product,
      status,
      color,
      gender,
      size,
      price,
      quantity,
    });

    return (await productDetail.save())
      .populate('product')
      .populate('status')
      .populate('color')
      .populate('gender');
  }

  async getAllProductDetail(idProduct: string): Promise<ProductDetail[]> {
    const product = await this.findOne(idProduct);
    const activeStatus = await this.findStatusWithName(StatusEnum.Active);
    const productDetails = await this.productDetailModel
      .find(
        { product: product, status: activeStatus, quantity: { $gt: 0 } },
        { product: 0 },
      )
      .populate('status')
      .populate('color')
      .populate('gender');
    return productDetails;
  }

  async updateProductDetail(
    idProductDetail: string,
    updateProductDetailDto: UpdateProductDetailDto,
  ): Promise<ProductDetail> {
    const { statusId, colorId, genderId, price, quantity, sizeId } =
      updateProductDetailDto;

    let status = null;
    status = await this.statusModel.findById(statusId);
    if (!status) throw new NotFoundException('status not existed');

    let color = null;
    color = await this.colorModel.findById(colorId);
    if (!color) throw new NotFoundException('color not existed');

    let gender = null;
    gender = await this.genderModel.findById(genderId);
    if (!gender) throw new NotFoundException('gender not existed');

    let size = null;
    size = await this.sizeModel.findById(sizeId);
    if (!size) throw new NotFoundException('size not existed');

    const productDetail = await this.productDetailModel
      .findByIdAndUpdate(
        idProductDetail,
        {
          status,
          color,
          gender,
          size,
          price,
          quantity,
        },
        { new: true, runValidators: true },
      )
      .populate('status')
      .populate('color')
      .populate('gender');
    return productDetail;
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
