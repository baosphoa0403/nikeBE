import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IsNotBlank } from 'src/custom-validator/is-not-blank.validator';

export class CreateRoleDto {
  @IsNotBlank('nameRole', { message: 'Role name is not empty' })
  @ApiProperty({
    type: String,
  })
  nameRole: string;
}
