import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, ValidateNested } from 'class-validator';

class Quantity {
  @IsNumber()
  @ApiProperty({ type: Number })
  quantity: number;

  @IsMongoId()
  @ApiProperty({ type: String })
  sizeId: string;

  @IsNumber()
  @ApiProperty({ type: Number })
  price: number;
}
export class CreateUpdateProductDetailDto {
  @IsMongoId()
  @ApiProperty({ type: String })
  statusId: string;

  @IsMongoId()
  @ApiProperty({ type: String })
  colorId: string;

  @IsMongoId()
  @ApiProperty({ type: String })
  genderId: string;

  @ApiProperty({ type: [Quantity] })
  quantities: Quantity[];

  @ApiProperty({ type: [String] })
  imageUrls: string[];
}
