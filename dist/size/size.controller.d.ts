import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size } from './entities/size.entity';
export declare class SizeController {
    private readonly sizeService;
    constructor(sizeService: SizeService);
    create(createSizeDto: CreateSizeDto): Promise<Size>;
    findAll(): Promise<Size[]>;
    findOne(id: string): Promise<Size>;
    update(id: string, updateSizeDto: UpdateSizeDto): Promise<Size>;
    remove(id: string): Promise<string>;
}
