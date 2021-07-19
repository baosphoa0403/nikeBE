import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateColorDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  nameColor: string;
}
