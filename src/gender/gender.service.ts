import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    let gender;
    try {
      gender = await this.genderModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Could not find color with id = ${id}`);
    }
    if (!gender) {
      throw new NotFoundException(`Could not find color with id = ${id}`);
    }
    return gender;
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

  async update(id: string, updateGenderDto: UpdateGenderDto) {
    // Filter out unwanted fields names that are not allowed to be updated
    const filterBody = this.filterObj(updateGenderDto, 'nameGender');

    const updatedGender = await this.genderModel.findByIdAndUpdate(
      id,
      filterBody,
    );
    return updatedGender;
  }

  async remove(id: string) {
    const color = await this.findOne(id);
    await this.genderModel.deleteOne({ _id: id });
    return null;
  }
}
