import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class IdProductDto{
    @IsMongoId()
    @ApiProperty({type:String})
    id: string;
}