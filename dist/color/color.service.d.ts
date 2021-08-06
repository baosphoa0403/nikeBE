import { Model } from 'mongoose';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color, ColorDocument } from './entities/color.entity';
export declare class ColorService {
    private colorModel;
    constructor(colorModel: Model<ColorDocument>);
    create(createColorDto: CreateColorDto): Promise<Color>;
    findAll(): Promise<Color[]>;
    findOne(id: string): Promise<Color>;
    update(id: string, updateColorDto: UpdateColorDto): Promise<Color>;
    remove(id: string): Promise<string>;
}
