import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsMongoId } from 'class-validator';
import { IsNotBlank } from 'src/custom-validator/is-not-blank.validator';

export class CreateUserProfileDto {
  @IsNotBlank('username', { message: 'username can not empty' })
  @ApiProperty({ type: String })
  username: string;

  @IsNotBlank('password', { message: 'password can not empty' })
  @ApiProperty({ type: String })
  password: string;

  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @IsNotBlank('name', { message: 'name can not empty' })
  @ApiProperty({ type: String })
  name: string;

  @IsInt()
  @ApiProperty({ type: Number })
  yearOfBirth: number;

  @ApiProperty({ type: String })
  address: string;
}
