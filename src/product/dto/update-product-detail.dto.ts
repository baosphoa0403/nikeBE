import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNumber } from "class-validator";

export class UpdateProductDetailDto{

    @IsMongoId()
    @ApiProperty({type:String})
    statusId: string;

    @IsMongoId()
    @ApiProperty({type:String})
    colorId: string;

    @IsMongoId()
    @ApiProperty({type:String})
    genderId: string;

    @IsNumber()
    @ApiProperty({type:Number})
    price: number;

    @IsNumber()
    @ApiProperty({type:Number})
    quantity: number;
}