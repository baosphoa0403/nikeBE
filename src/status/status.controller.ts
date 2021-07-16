import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Status } from './entities/status.entity';

@Controller('status')
@ApiTags('Status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  @ApiCreatedResponse({
    status: 201,
    description: 'Created  status',
    type: Status,
  })
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'Get All  status',
    type: Status,
  })
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':id')
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
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(id, updateStatusDto);
  }
  @ApiOkResponse({
    status: 201,
    description: 'Remove by ID  status',
    type: String,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.remove(id);
  }
}
