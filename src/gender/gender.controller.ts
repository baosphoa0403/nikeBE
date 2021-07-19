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
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { ApiTags } from '@nestjs/swagger';
import { Gender } from './entities/gender.entity';

@Controller('gender')
@ApiTags('Gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createGenderDto: CreateGenderDto): Promise<Gender> {
    return this.genderService.create(createGenderDto);
  }

  @Get()
  findAll(): Promise<Gender[]> {
    return this.genderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Gender> {
    return this.genderService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGenderDto: UpdateGenderDto,
  ): Promise<Gender> {
    return this.genderService.update(id, updateGenderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.genderService.remove(id);
  }
}
