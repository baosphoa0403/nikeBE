import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';
export declare class StatusController {
    private readonly statusService;
    constructor(statusService: StatusService);
    create(createStatusDto: CreateStatusDto): Promise<Status>;
    findAll(): Promise<Status[]>;
    findOne(id: string): Promise<Status>;
    update(id: string, updateStatusDto: UpdateStatusDto): Promise<Status>;
    remove(id: string): Promise<string>;
}
