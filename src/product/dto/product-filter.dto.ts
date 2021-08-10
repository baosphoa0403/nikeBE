import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class ProductFilterDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: [String] })
  genderId: string[];

  @ApiProperty({ type: [String] })
  colorId: string[];

  @ApiProperty({ type: [String] })
  sizeId: string[];
}
