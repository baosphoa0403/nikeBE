import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all code`;
  }

  findOne(id: number) {
    return `This action returns a #${id} code`;
  }

  update(id: number, updateCodeDto: UpdateCodeDto) {
    return `This action updates a #${id} code`;
  }

  remove(id: number) {
    return `This action removes a #${id} code`;
  }
}
