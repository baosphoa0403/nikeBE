import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color, ColorDocument } from './entities/color.entity';

@Injectable()
export class ColorService {
  constructor(
    @InjectModel(Color.name) private colorModel: Model<ColorDocument>,
  ) {}

  async create(createColorDto: CreateColorDto): Promise<Color> {
    const createdColor = new this.colorModel(createColorDto);
    return await createdColor.save();
  }

  async findAll(): Promise<Color[]> {
    return await this.colorModel.find();
  }

  async findOne(id: string): Promise<Color> {
    let color;
    try {
      color = await this.colorModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`id = ${id} is invalid format`);
    }
    if (!color) {
      throw new NotFoundException(`Could not find color with id = ${id}`);
    }
    return color;
  }

  async update(id: string, updateColorDto: UpdateColorDto): Promise<Color> {
    let updatedColor = await this.findOne(id);

    updatedColor = await this.colorModel.findByIdAndUpdate(id, updateColorDto, {
      new: true,
      runValidators: true,
    });

    return updatedColor;
  }

  async remove(id: string): Promise<string> {
    const color = await this.findOne(id);
    await this.colorModel.deleteOne({ _id: id });
    return `delete nameColor ${id} successfully`;
  }
}
