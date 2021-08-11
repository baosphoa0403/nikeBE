import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Code } from "src/code/entities/code.entity";
import { Status } from "src/status/entities/status.entity";
import { User } from "src/user/entities/user.entity";
export type CodeDetailDocument = CodeDetail & Document;

@Schema()
export class CodeDetail {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Code'})
    code: Code;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Status'})
    status: Status;
}

export const CodeDetailSchema = SchemaFactory.createForClass(CodeDetail);