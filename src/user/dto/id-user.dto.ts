import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class IdUserDto{
    @IsMongoId()
    @ApiProperty({type:String})
    id: string;
}