import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Role } from 'src/role/entities/role.entity';
import { Status } from 'src/status/entities/status.entity';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  yearOfBirth: Date;

  @Prop()
  address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Status' })
  status: Status;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;
}
export const UserSchema = SchemaFactory.createForClass(User);
