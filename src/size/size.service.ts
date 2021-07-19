import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size, SizeDocument } from './entities/size.entity';

@Injectable()
export class SizeService {
  constructor(@InjectModel(Size.name) private sizeModel: Model<SizeDocument>) {}

  async create(createSizeDto: CreateSizeDto): Promise<Size> {
    const createdSize = new this.sizeModel(createSizeDto);
    return await createdSize.save();
  }

  async findAll(): Promise<Size[]> {
    return await this.sizeModel.find();
  }

  async findOne(id: string): Promise<Size> {
    let size;
    try {
      size = await this.sizeModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`id = ${id} is invalid`);
    }
    if (!size) {
      throw new NotFoundException(`Could not find size with id = ${id}`);
    }
    return size;
  }

  async update(id: string, updateSizeDto: UpdateSizeDto): Promise<Size> {
    let updatedSize = await this.findOne(id);
    updatedSize = await this.sizeModel.findByIdAndUpdate(id, updateSizeDto, {
      new: true,
      runValidators: true,
    });

    return updatedSize;
  }

  async remove(id: string): Promise<string> {
    const size = await this.findOne(id);
    await this.sizeModel.deleteOne({ _id: id });
    return `delete size id = ${id} successfully`;
  }
}
