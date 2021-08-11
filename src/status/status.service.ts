import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusEnum } from 'src/common/status.enum';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status, StatusDocument } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status.name) private statusModel: Model<StatusDocument>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const status = new this.statusModel(createStatusDto);
    return await status.save();
  }
  async findAll(): Promise<Status[]> {
    return await this.statusModel.find().populate('listProduct');
  }
  async findByName(name: string): Promise<Status> {
    return await this.statusModel.findOne({nameStatus: name});
  }

  async findOne(id: string): Promise<Status> {
    let status;
    try {
      status = await this.statusModel.findById(id);
    } catch (error) {
      throw new BadRequestException(id + ' invalid format');
    }
    if (!status) {
      throw new NotFoundException(
        'id ' + id + ' not found in class ' + Status.name,
      );
    }
    return status;
  }

  async update(id: string, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const { nameStatus } = updateStatusDto;
    const status = await this.statusModel.findById(id);
    status.nameStatus = nameStatus;
    return await status.save();
  }

  async remove(id: string): Promise<string> {
    let status;
    try {
      status = await this.statusModel.findById(id);
    } catch (error) {
      throw new BadRequestException(id + ' invalid format');
    }

    if (!status) {
      throw new NotFoundException(
        'id ' + id + ' not found in class ' + Status.name,
      );
    }
    status.remove();
    return `delete status ${id} successfull`;
  }
}
