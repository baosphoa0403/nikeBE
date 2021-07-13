import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status, StatusDocument } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status.name) private statusModel: Model<StatusDocument>,
  ) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const status = new this.statusModel(createStatusDto);
    return await status.save();
  }
  async findAll(): Promise<Status[]> {
    return await this.statusModel.find();
  }

  async findOne(id: string): Promise<Status> {
    return await this.statusModel.findById(id);
  }

  async update(id: string, updateStatusDto: UpdateStatusDto) {
    const { idProduct, nameStatus } = updateStatusDto;
    const status = await this.statusModel.findById(id);
    status.listProduct.push();
    return await status.save();
  }

  remove(id: string) {
    return `This action removes a #${id} status`;
  }
}
