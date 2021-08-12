import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsNumber } from 'class-validator';
import { IsNotBlank } from 'src/custom-validator/is-not-blank.validator';

export class CreateProductDto {
  @IsNotBlank('name', { message: 'name can not empty' })
  @ApiProperty({ type: String })
  name: string;

  @IsMongoId()
  @ApiProperty({ type: String })
  categoryId: string;
  
  @IsDateString()
  @ApiProperty({ type: Date })
  createDate: Date;
}
