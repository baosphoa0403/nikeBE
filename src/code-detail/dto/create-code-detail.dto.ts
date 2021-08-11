import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class CreateCodeDetailDto {
    @IsMongoId()
    @ApiProperty({
        type: String,
    })
    idCode: string;

    @ApiProperty({
        type: [String],
    })
    listIdUsers: string[];

    @IsMongoId()
    @ApiProperty({
        type: String,
    })
    idStatus: string;
}
