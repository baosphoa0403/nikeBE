import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
export class DetailProduct {
  @ApiProperty({
    type: String,
  })
  idDetailProduct: string;

  @ApiProperty({
    type: Number,
  })
  quantity: number;

  @ApiProperty({ type: String })
  @IsMongoId()
  sizeId: string;
}
export class CreateOrderDto {
  @IsMongoId()
  @ApiProperty({
    type: String,
  })
  idDiscount: string;

  @ApiProperty({
    type: [DetailProduct],
  })
  listDetailProduct: DetailProduct[];

  @ApiProperty({
    type: Date,
  })
  // @IsDate()
  dateShip: Date;
}
