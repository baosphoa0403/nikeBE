import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";
import * as mongoose from 'mongoose';

export type RoleDocument = Role & Document;
@Schema()
export class Role{
    
    @Prop()
    nameRole: string;

    @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]})
    listUser: User[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);