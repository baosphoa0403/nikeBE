import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender, GenderDocument } from './entities/gender.entity';

@Injectable()
export class GenderService {
  constructor(
    @InjectModel(Gender.name) private genderModel: Model<GenderDocument>,
  ) {}

  async create(createGenderDto: CreateGenderDto): Promise<Gender> {
    const createdGender = new this.genderModel(createGenderDto);
    return await createdGender.save();
  }

  async findAll(): Promise<Gender[]> {
    return await this.genderModel.find();
  }

  async findOne(id: string): Promise<Gender> {
    let gender;
    try {
      gender = await this.genderModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`id = ${id} is invalid`);
    }
    if (!gender) {
      throw new NotFoundException(`Could not find color with id = ${id}`);
    }
    return gender;
  }

  async update(id: string, updateGenderDto: UpdateGenderDto): Promise<Gender> {
    let updatedGender = await this.findOne(id);

    updatedGender = await this.genderModel.findByIdAndUpdate(
      id,
      updateGenderDto,
      {
        new: true,
        runValidators: true,
      },
    );

    return updatedGender;
  }

  async remove(id: string): Promise<string> {
    const gender = await this.findOne(id);
    await this.genderModel.deleteOne({ _id: id });
    return `delete nameGender ${id} successfully`;
  }
}
