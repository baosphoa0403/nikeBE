import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateColorDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  nameColor: string;
}
