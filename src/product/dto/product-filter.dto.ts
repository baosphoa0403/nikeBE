import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class ProductFilterDto {
  @ApiProperty({ type: String, required: false })
  name: string;

  @ApiProperty({ type: [String], required: false })
  genderId: string[];

  @ApiProperty({ type: [String], required: false })
  colorId: string[];

  @ApiProperty({ type: [String], required: false })
  sizeId: string[];
}
