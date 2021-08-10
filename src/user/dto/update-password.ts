import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsMongoId } from 'class-validator';
import { IsNotBlank } from 'src/custom-validator/is-not-blank.validator';

export class UpdatePassword {
  @IsNotBlank('password', { message: 'username can not empty' })
  @ApiProperty({ type: String })
  password: string;
}
