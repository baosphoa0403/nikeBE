import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CodeDocument = Code & Document;
@Schema()
export class Code {
    @Prop()
    codeName: string;

    @Prop()
    codeValue: number;
}
export const CodeSchema = SchemaFactory.createForClass(Code);
