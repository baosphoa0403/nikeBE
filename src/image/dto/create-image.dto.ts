import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString } from "class-validator";
import { IsNotBlank } from "src/custom-validator/is-not-blank.validator";

export class CreateImageDto {
    @IsString()
    @ApiProperty({
        type: String
    })
    @IsNotBlank('urlImage', {message: "urlImage is not empty"})
    urlImage: string

    @ApiProperty({
        type: String
    })
    @IsMongoId()
    idShoesDetail: string
}
