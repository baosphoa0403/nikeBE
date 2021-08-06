import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';
export declare class ColorController {
    private readonly colorService;
    constructor(colorService: ColorService);
    create(createColorDto: CreateColorDto): Promise<Color>;
    findAll(): Promise<Color[]>;
    findOne(id: string): Promise<Color>;
    update(id: string, updateColorDto: UpdateColorDto): Promise<Color>;
    remove(id: string): Promise<string>;
}
