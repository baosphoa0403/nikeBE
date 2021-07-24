import { ApiProperty } from '@nestjs/swagger';
import { IsNotBlank } from 'src/custom-validator/is-not-blank.validator';

export class CreateRoleDto {
  @IsNotBlank('nameRole', { message: 'Role name can not empty' })
  @ApiProperty({
    type: String,
  })
  nameRole: string;
}