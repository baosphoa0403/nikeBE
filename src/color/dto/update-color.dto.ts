import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateColorDto } from './create-color.dto';

export class UpdateColorDto extends PartialType(CreateColorDto) {
  @IsNotEmpty()
  nameColor: string;
}
