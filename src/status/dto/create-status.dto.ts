import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Status } from '../entities/status.entity';

export class CreateStatusDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  nameStatus: string;
}
