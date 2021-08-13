import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";
export class DetailProduct {
    @ApiProperty({
        type: String,
    })
    idProduct: string

    @ApiProperty({
        type: Number,
    })
    quantity: number
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
    listDetailProduct: DetailProduct[]

    @ApiProperty({
        type: Date,
    })
    // @IsDate()
    dateShip: Date
}
