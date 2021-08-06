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
import { ApiTags } from '@nestjs/swagger';
import { ListRole } from 'src/auth/role/role.enum';
import { Public } from 'src/Decorator/metadata';
import { JwtAuthGuard } from 'src/Guards/jwt-auth-guard';
import { RolesGuard } from 'src/Guards/roles-guard';
import { Roles } from 'src/Guards/roles.decorator';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('color')
@ApiTags('Color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @Roles(ListRole.Admin)
  @UsePipes(ValidationPipe)
  create(@Body() createColorDto: CreateColorDto): Promise<Color> {
    return this.colorService.create(createColorDto);
  }

  @Get()
  @Public()
  findAll(): Promise<Color[]> {
    return this.colorService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<Color> {
    return this.colorService.findOne(id);
  }

  @Patch(':id')
  @Roles(ListRole.Admin)
  update(
    @Param('id') id: string,
    @Body() updateColorDto: UpdateColorDto,
  ): Promise<Color> {
    return this.colorService.update(id, updateColorDto);
  }

  @Delete(':id')
  @Roles(ListRole.Admin)
  remove(@Param('id') id: string): Promise<string> {
    return this.colorService.remove(id);
  }
}
