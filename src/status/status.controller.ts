import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Status } from './entities/status.entity';
import { Roles } from 'src/Guards/roles.decorator';
import { JwtAuthGuard } from 'src/Guards/jwt-auth-guard';
import { RolesGuard } from 'src/Guards/roles-guard';
import { ListRole } from 'src/auth/role/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('status')
@ApiTags('Status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  @Roles(ListRole.Admin)
  @ApiCreatedResponse({
    status: 201,
    description: 'Created  status',
    type: Status,
  })
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  @Roles(ListRole.Admin)
  @ApiOkResponse({
    status: 200,
    description: 'Get All  status',
    type: Status,
  })
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':id')
  @Roles(ListRole.Admin)
  @ApiOkResponse({
    status: 201,
    description: 'Get ID  status',
    type: Status,
  })
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(id);
  }
  @ApiOkResponse({
    status: 201,
    description: 'Update by ID  status',
    type: String,
  })
  @Patch(':id')
  @Roles(ListRole.Admin)
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(id, updateStatusDto);
  }
  @ApiOkResponse({
    status: 201,
    description: 'Remove by ID  status',
    type: String,
  })
  @Delete(':id')
  @Roles(ListRole.Admin)
  remove(@Param('id') id: string) {
    return this.statusService.remove(id);
  }
}
