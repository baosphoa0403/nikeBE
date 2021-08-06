import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';
export declare class GenderController {
    private readonly genderService;
    constructor(genderService: GenderService);
    create(createGenderDto: CreateGenderDto): Promise<Gender>;
    findAll(): Promise<Gender[]>;
    findOne(id: string): Promise<Gender>;
    update(id: string, updateGenderDto: UpdateGenderDto): Promise<Gender>;
    remove(id: string): Promise<string>;
}
