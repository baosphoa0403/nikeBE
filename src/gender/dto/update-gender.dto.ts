import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateGenderDto } from './create-gender.dto';

export class UpdateGenderDto extends PartialType(CreateGenderDto) {
  @IsNotEmpty()
  nameGender: string;
}
