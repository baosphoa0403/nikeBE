import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created successfully category',
    type: Category,
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'Get Detail Category',
    type: [Category],
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    status: 200,
    description: 'Get Detail Category',
    type: Category,
  })
  @ApiBadRequestResponse({ status: 404, description: 'Not found ID' })
  findOne(@Param('id') id: string) {
    const category = this.categoryService.findOne(id);
    return category;
  }

  @Patch(':id')
  @ApiAcceptedResponse({
    status: 200,
    description: 'Update Category',
    type: Category,
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    status: 200,
    description: 'Remove Category',
    type: Category,
  })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
