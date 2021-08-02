import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsMongoId } from 'class-validator';
import { IsNotBlank } from 'src/custom-validator/is-not-blank.validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto{

    @IsNotBlank('password', {message:'password can not empty'})
    @ApiProperty({type:String})
    password: string;
    
    @IsEmail()
    @ApiProperty({type:String})
    email: string;

    @IsNotBlank('name',{message:'name can not empty'})
    @ApiProperty({type:String})
    name: string;

    @IsDateString()
    @ApiProperty({type:Date})
    yearOfBirth: Date;

    @ApiProperty({type:String})
    address: string;

    @IsMongoId()
    @ApiProperty({type:String})
    statusId: string;

    @IsMongoId()
    @ApiProperty({type:String})
    roleId: string;
}
