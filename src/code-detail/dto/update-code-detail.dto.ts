import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class UpdateCodeDetailDto  {
    @ApiProperty({
        type: String
    })
    @IsMongoId()
    idStatus: string
}
