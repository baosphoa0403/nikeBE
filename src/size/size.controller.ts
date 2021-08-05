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
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size } from './entities/size.entity';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/Guards/jwt-auth-guard';
import { RolesGuard } from 'src/Guards/roles-guard';
import { Roles } from 'src/Guards/roles.decorator';
import { ListRole } from 'src/auth/role/role.enum';
import { Public } from 'src/Decorator/metadata';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('size')
@ApiTags('Size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  @Roles(ListRole.Admin)
  create(@Body() createSizeDto: CreateSizeDto): Promise<Size> {
    return this.sizeService.create(createSizeDto);
  }

  @Get()
  @Public()
  findAll(): Promise<Size[]> {
    return this.sizeService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<Size> {
    return this.sizeService.findOne(id);
  }

  @Patch(':id')
  @Roles(ListRole.Admin)
  update(
    @Param('id') id: string,
    @Body() updateSizeDto: UpdateSizeDto,
  ): Promise<Size> {
    return this.sizeService.update(id, updateSizeDto);
  }

  @Delete(':id')
  @Roles(ListRole.Admin)
  remove(@Param('id') id: string): Promise<string> {
    return this.sizeService.remove(id);
  }
}
