
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { IsNotBlank } from 'src/custom-validator/is-not-blank.validator';

export class UpdateCodeDto  {
    @IsString()
    @IsNotBlank('codeName', {message: "codeName empty"})
    @ApiProperty({
        type: String,
    })
    codeName: string;
    @ApiProperty({
        type: Number,
        default: 10
    })
    @IsNumber()
    codeValue: number;
}
