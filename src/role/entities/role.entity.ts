import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RoleDocument = Role & Document;
@Schema()
export class Role {
  @Prop()
  nameRole: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
