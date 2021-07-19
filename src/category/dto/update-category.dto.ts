import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  nameCategory: string;
}
