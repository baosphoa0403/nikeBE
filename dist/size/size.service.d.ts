import { Model } from 'mongoose';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size, SizeDocument } from './entities/size.entity';
export declare class SizeService {
    private sizeModel;
    constructor(sizeModel: Model<SizeDocument>);
    create(createSizeDto: CreateSizeDto): Promise<Size>;
    findAll(): Promise<Size[]>;
    findOne(id: string): Promise<Size>;
    update(id: string, updateSizeDto: UpdateSizeDto): Promise<Size>;
    remove(id: string): Promise<string>;
}
