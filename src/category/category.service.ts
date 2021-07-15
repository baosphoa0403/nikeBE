import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import FieldWrongExceptionCustom from '../exception/FieldWrongExceptionCustom.exception';
import EntiyNotFoundCustom from 'src/exception/EntiyNotFoundCustom.exception';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private productModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const categoryCreate = Object.keys(createCategoryDto);
    const fieldCreateAllow: string[] = ['nameCategory'];
    const categoryNameError: string[] = [];
    categoryCreate.map((item) => {
      if (!fieldCreateAllow.includes(item)) {
        categoryNameError.push(item);
      }
    });
    if (categoryNameError.length > 0) {
      throw new FieldWrongExceptionCustom(categoryNameError);
    }
    const category = new this.productModel(createCategoryDto);
    return category.save();
  }

  async findAll(): Promise<Category[]> {
    return await this.productModel.find();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.productModel.findById(id);
    if (!category) {
      throw new EntiyNotFoundCustom(id, Category.name);
    }
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const categoryUpdate = Object.keys(updateCategoryDto);
    const fieldCreateAllow: string[] = ['nameCategory'];
    const categoryNameError: string[] = [];
    categoryUpdate.map((item) => {
      if (!fieldCreateAllow.includes(item)) {
        categoryNameError.push(item);
      }
    });
    if (categoryNameError.length > 0) {
      throw new FieldWrongExceptionCustom(categoryNameError);
    }
    const category = await this.productModel.findById(id);

    if (!category) {
      throw new EntiyNotFoundCustom(id, Category.name);
    }

    category.nameCategory = updateCategoryDto.nameCategory;
    return await category.save();
  }

  async remove(id: string): Promise<Category> {
    const category = await this.productModel.findById(id);

    if (!category) {
      throw new EntiyNotFoundCustom(id, Category.name);
    }

    return category.remove();
  }
}
