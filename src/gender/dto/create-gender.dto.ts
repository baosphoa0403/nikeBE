import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateGenderDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  nameGender: string;
}
