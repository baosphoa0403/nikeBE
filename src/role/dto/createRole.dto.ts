<<<<<<< HEAD
=======
import { ApiProperty } from '@nestjs/swagger';
>>>>>>> d5c9cc349d9b61ed8c55643fac5b755003114568
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IsNotBlank } from 'src/custom-validator/is-not-blank.validator';

export class CreateRoleDto {
  @IsNotBlank('nameRole', { message: 'Role name is not empty' })
<<<<<<< HEAD
=======
  @ApiProperty({
    type: String,
  })
>>>>>>> d5c9cc349d9b61ed8c55643fac5b755003114568
  nameRole: string;
}
