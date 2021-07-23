import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class IdRoleDto{

    @IsMongoId()
    @ApiProperty({
        type: String,
    })
    id:string;
}