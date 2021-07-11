import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<CreateProductDto> {
    try {
      const createProductDTO = new this.productModel(createProductDto);
      return await createProductDTO.save();
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<CreateProductDto[]> {
    return await this.productModel.find();
  }

  async findOne(id: string) {
    return await this.productModel.findById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
