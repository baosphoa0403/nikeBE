import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { IsNotBlank } from "src/custom-validator/is-not-blank.validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateRoleDto{

    @IsNotBlank('nameRole',{message: 'Role name can not empty'})
    @ApiProperty({
        type: String,
    })
    nameRole: string;

    @ApiProperty({
        type: [CreateUserDto],
    })
    listUser:CreateUserDto[];
}