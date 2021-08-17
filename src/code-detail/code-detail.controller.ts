import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListRole } from 'src/auth/role/role.enum';
import { JwtAuthGuard } from 'src/Guards/jwt-auth-guard';
import { RolesGuard } from 'src/Guards/roles-guard';
import { Roles } from 'src/Guards/roles.decorator';
import { CodeDetailService } from './code-detail.service';
import { CreateCodeDetailDto } from './dto/create-code-detail.dto';
import { UpdateCodeDetailDto } from './dto/update-code-detail.dto';
@ApiTags("CodeDetail")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('code-detail')
export class CodeDetailController {
  constructor(private readonly codeDetailService: CodeDetailService) {}

  @Post()
  create(@Body() createCodeDetailDto: CreateCodeDetailDto) {
    return this.codeDetailService.create(createCodeDetailDto);
  }

  @Roles(ListRole.User)
  @Get('getCodeDetailUser')
  getCodeDetailUser(@Request() req) {
    return  this.codeDetailService.getCodeDetailUser(req.user.userId);;
  }

  @Get()
  findAll() {
    return this.codeDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codeDetailService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCodeDetailDto: UpdateCodeDetailDto) {
    return this.codeDetailService.update(+id, updateCodeDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codeDetailService.remove(+id);
  }
  
}
