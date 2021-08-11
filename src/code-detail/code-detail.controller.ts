import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CodeDetailService } from './code-detail.service';
import { CreateCodeDetailDto } from './dto/create-code-detail.dto';
import { UpdateCodeDetailDto } from './dto/update-code-detail.dto';
@ApiTags("CodeDetail")
@Controller('code-detail')
export class CodeDetailController {
  constructor(private readonly codeDetailService: CodeDetailService) {}

  @Post()
  create(@Body() createCodeDetailDto: CreateCodeDetailDto) {
    return this.codeDetailService.create(createCodeDetailDto);
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
