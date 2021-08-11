import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status, StatusDocument } from './entities/status.entity';
export declare class StatusService {
    private statusModel;
    private readonly productService;
    constructor(statusModel: Model<StatusDocument>, productService: ProductService);
    create(createStatusDto: CreateStatusDto): Promise<Status>;
    findAll(): Promise<Status[]>;
    findByName(name: string): Promise<Status>;
    findOne(id: string): Promise<Status>;
    update(id: string, updateStatusDto: UpdateStatusDto): Promise<Status>;
    remove(id: string): Promise<string>;
}
