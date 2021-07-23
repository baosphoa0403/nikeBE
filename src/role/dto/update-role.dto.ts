import { ApiProperty } from "@nestjs/swagger";
import { IsNotBlank } from "src/custom-validator/is-not-blank.validator";

export class UpdateRoleDto{
    
    @IsNotBlank('nameRole',{message: 'Role name is not empty'})
    @ApiProperty({
        type: String,
    })
    nameRole: string;
}