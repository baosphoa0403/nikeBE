import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateSizeDto } from './create-size.dto';

export class UpdateSizeDto extends PartialType(CreateSizeDto) {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  nameSize: string;
}
