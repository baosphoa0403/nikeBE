import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusService } from 'src/status/status.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly statusService: StatusService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const { color, name, size } = createProductDto;
      const statusDTO = await this.statusService.findOne(createProductDto._id);
      const product = new Product();
      product.color = color;
      product.name = name;
      product.size = size;
      product.status = statusDTO;
      const createProductDTO = new this.productModel(product);
      return await createProductDTO.save();
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().populate('status');
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findById(id).populate('status');
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { color, name, size, idStatus } = updateProductDto;
    const product = await this.productModel.findById(id);
    const statusDTO = await this.statusService.findOne(idStatus);
    product.name = name;
    product.color = color;
    product.size = size;
    product.status = statusDTO;
    return await product.save();
  }

  async remove(id: string): Promise<Product> {
    const product = await this.productModel.findByIdAndRemove(id);
    return product;
  }
}
