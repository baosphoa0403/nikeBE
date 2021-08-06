import { Model } from 'mongoose';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender, GenderDocument } from './entities/gender.entity';
export declare class GenderService {
    private genderModel;
    constructor(genderModel: Model<GenderDocument>);
    create(createGenderDto: CreateGenderDto): Promise<Gender>;
    findAll(): Promise<Gender[]>;
    findOne(id: string): Promise<Gender>;
    update(id: string, updateGenderDto: UpdateGenderDto): Promise<Gender>;
    remove(id: string): Promise<string>;
}
