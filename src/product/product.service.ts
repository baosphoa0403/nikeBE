import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { Color } from 'src/color/entities/color.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { Status } from 'src/status/entities/status.entity';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDetail } from './entities/product-detail.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(ProductDetail.name)
    private productDetailModel: Model<ProductDetail>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Status.name) private statusModel: Model<Category>,
    @InjectModel(Color.name) private colorModel: Model<Category>,
    @InjectModel(Gender.name) private genderModel: Model<Category>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, categoryId } = createProductDto;
    const category = await this.categoryModel.findById(categoryId);
    if (!category) throw new NotFoundException('category not existed');

    const product = new this.productModel({ name, category });
    return (await product.save()).populate('category');
  }

  async getAllProduct(): Promise<Product[]> {
    return await this.productModel.find().populate('category');
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
    await product.remove();
    return `delete product ${idProduct} successful`;
  }

  async insertDetail(
    idProduct: string,
    createProductDetailDto: CreateProductDetailDto,
  ): Promise<ProductDetail> {
    const { statusId, colorId, genderId, price, quantity } =
      createProductDetailDto;
    const product = await this.findOne(idProduct);

    const status = await this.statusModel.findById(statusId);
    if (!status) throw new NotFoundException('status not existed');

    const color = await this.colorModel.findById(colorId);
    if (!color) throw new NotFoundException('color not existed');

    const gender = await this.genderModel.findById(genderId);
    if (!gender) throw new NotFoundException('gender not existed');

    const productDetail = await new this.productDetailModel({
      product,
      status,
      color,
      gender,
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
    const productDetails = await this.productDetailModel
      .find({ product: product }, { product: 0 })
      .populate('status')
      .populate('color')
      .populate('gender');
    return productDetails;
  }

  async updateProductDetail(
    idProductDetail: string,
    updateProductDetailDto: UpdateProductDetailDto,
  ): Promise<ProductDetail> {
    const { statusId, colorId, genderId, price, quantity } =
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

    const productDetail = await this.productDetailModel
      .findByIdAndUpdate(
        idProductDetail,
        {
          status,
          color,
          gender,
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
    const productDetail = await this.productDetailModel.findById(
      idProductDetail,
    );
    if (!productDetail)
      throw new NotFoundException('product detail not existed');
    await productDetail.remove();
    return `delete product detail ${idProductDetail} successful`;
  }
}
