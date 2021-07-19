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
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size } from './entities/size.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('size')
@ApiTags('Size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createSizeDto: CreateSizeDto): Promise<Size> {
    return this.sizeService.create(createSizeDto);
  }

  @Get()
  findAll(): Promise<Size[]> {
    return this.sizeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Size> {
    return this.sizeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSizeDto: UpdateSizeDto,
  ): Promise<Size> {
    return this.sizeService.update(id, updateSizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.sizeService.remove(id);
  }
}
