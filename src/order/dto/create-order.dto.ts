import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsMongoId } from "class-validator";

export class CreateOrderDto {
    @IsMongoId()
    @ApiProperty({
        type: String,
    })
    idDiscount: string;

    @ApiProperty({
        type: [String],
    })
    @IsMongoId({
        each: true
    })
    listIdDetailProduct: string[]

    @ApiProperty({
        type: Date,
    })
    @IsDate()
    dateShip: Date
}
