import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class UpdateOrderDto {
    @ApiProperty({
        type: String,
      })
    @IsMongoId()
    idStatus: string;
}
