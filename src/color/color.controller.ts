import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';

@Controller('color')
@ApiTags('Color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createColorDto: CreateColorDto): Promise<Color> {
    return this.colorService.create(createColorDto);
  }

  @Get()
  findAll(): Promise<Color[]> {
    return this.colorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Color> {
    return this.colorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateColorDto: UpdateColorDto,
  ): Promise<Color> {
    return this.colorService.update(id, updateColorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.colorService.remove(id);
  }
}
