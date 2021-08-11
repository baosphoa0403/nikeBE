import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { Code } from './entities/code.entity';

@Injectable()
export class CodeService {
  constructor(@InjectModel(Code.name) private codeModel: Model<Code> ){}
  create(createCodeDto: CreateCodeDto) {
    const code = new this.codeModel(createCodeDto);
    return code.save();
  }

  async findAll() {
    return await this.codeModel.find({}, {__v: 0});
  }

  async findOne(id: string) {
    return await this.codeModel.findById({_id: id}, {__v: 0});
  }

  async update(id: string, updateCodeDto: UpdateCodeDto) {
    const code = await this.codeModel.findById({_id: id});
    if (!code) {
      throw new BadRequestException("code not found");
    }
    const {codeName, codeValue} = updateCodeDto;
    await this.codeModel.updateOne({_id: id}, {$set: {codeName: codeName, codeValue: codeValue}})
    return `Update code successfully ${id} code`;
  }

  async remove(id: string) {
    const code = await this.findOne(id);
    await code.remove();
    return `remove ${id} code successfully`;
  }
}
