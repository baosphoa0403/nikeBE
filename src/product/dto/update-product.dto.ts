import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { IsNotBlank } from 'src/custom-validator/is-not-blank.validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNotBlank('name',{message:'name can not empty'})
  @ApiProperty({type:String})
  name: string;

  @IsMongoId()
  @ApiProperty({type:String})
  categoryId: string;
}
