import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateGenderDto } from './create-gender.dto';

export class UpdateGenderDto extends PartialType(CreateGenderDto) {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  nameGender: string;
}
