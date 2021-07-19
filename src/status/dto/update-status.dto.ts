import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateStatusDto } from './create-status.dto';

export class UpdateStatusDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  nameStatus: string;
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  idProduct: string;
}
