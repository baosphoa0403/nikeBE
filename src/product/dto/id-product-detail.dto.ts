import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class IdProductDetailDto{
    @IsMongoId()
    @ApiProperty({type:String})
    id: string;
}