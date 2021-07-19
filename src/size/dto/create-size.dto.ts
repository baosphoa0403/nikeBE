import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSizeDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  nameSize: string;
}
