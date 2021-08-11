import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListRole } from 'src/auth/role/role.enum';
import { JwtAuthGuard } from 'src/Guards/jwt-auth-guard';
import { RolesGuard } from 'src/Guards/roles-guard';
import { Roles } from 'src/Guards/roles.decorator';
import { CodeService } from './code.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ListRole.Admin)
@ApiBearerAuth()
@ApiTags('Code')
@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}


  @Post()
  create(@Body() createCodeDto: CreateCodeDto) {
    return this.codeService.create(createCodeDto);
  }

  @Get()
  findAll() {
    return this.codeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCodeDto: UpdateCodeDto) {
    return this.codeService.update(id, updateCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codeService.remove(id);
  }
}
