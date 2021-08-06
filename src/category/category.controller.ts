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
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ListRole } from 'src/auth/role/role.enum';
import { Public } from 'src/Decorator/metadata';
import { JwtAuthGuard } from 'src/Guards/jwt-auth-guard';
import { RolesGuard } from 'src/Guards/roles-guard';
import { Roles } from 'src/Guards/roles.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(ListRole.Admin)
  @ApiResponse({
    status: 201,
    description: 'Created successfully category',
    type: Category,
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({
    status: 200,
    description: 'Get Detail Category',
    type: [Category],
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @Public()
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
  @Roles(ListRole.Admin)
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
  @Roles(ListRole.Admin)
  @ApiOkResponse({
    status: 200,
    description: 'Remove Category',
    type: Category,
  })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
