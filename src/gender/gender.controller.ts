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
  UseGuards,
} from '@nestjs/common';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { ApiTags } from '@nestjs/swagger';
import { Gender } from './entities/gender.entity';
import { JwtAuthGuard } from 'src/Guards/jwt-auth-guard';
import { RolesGuard } from 'src/Guards/roles-guard';
import { Roles } from 'src/Guards/roles.decorator';
import { ListRole } from 'src/auth/role/role.enum';
import { Public } from 'src/Decorator/metadata';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('gender')
@ApiTags('Gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  @Roles(ListRole.Admin)
  create(@Body() createGenderDto: CreateGenderDto): Promise<Gender> {
    return this.genderService.create(createGenderDto);
  }

  @Get()
  @Public()
  findAll(): Promise<Gender[]> {
    return this.genderService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<Gender> {
    return this.genderService.findOne(id);
  }

  @Patch(':id')
  @Roles(ListRole.Admin)
  update(
    @Param('id') id: string,
    @Body() updateGenderDto: UpdateGenderDto,
  ): Promise<Gender> {
    return this.genderService.update(id, updateGenderDto);
  }

  @Delete(':id')
  @Roles(ListRole.Admin)
  remove(@Param('id') id: string): Promise<string> {
    return this.genderService.remove(id);
  }
}
