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

  async create(createSizeDto: CreateSizeDto) {
    // Filter out unwanted fields names
    const filterBody = this.filterObj(createSizeDto, 'nameSize');
    if (Object.keys(filterBody).length === 0) {
      throw new BadRequestException('Fields are invalid');
    }

    const createdSize = new this.sizeModel(createSizeDto);
    return await createdSize.save();
  }

  async findAll() {
    return await this.sizeModel.find();
  }

  async findOne(id: string) {
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

  filterObj = (userFields, ...allowedFields) => {
    const newObj = {};
    Object.keys(userFields).forEach((el) => {
      if (allowedFields.includes(el)) {
        newObj[el] = userFields[el];
      }
    });

    return newObj;
  };

  async update(id: string, updateSizeDto: UpdateSizeDto) {
    let updatedSize = await this.findOne(id);

    // Filter out unwanted fields names that are not allowed to be updated
    const filterBody = this.filterObj(updateSizeDto, 'nameSize');
    if (Object.keys(filterBody).length === 0) {
      throw new BadRequestException('Fields are invalid');
    }

    updatedSize = await this.sizeModel.findByIdAndUpdate(id, updateSizeDto, {
      new: true,
      runValidators: true,
    });

    return updatedSize;
  }

  async remove(id: string) {
    const color = await this.findOne(id);
    await this.sizeModel.deleteOne({ _id: id });
    return null;
  }
}
