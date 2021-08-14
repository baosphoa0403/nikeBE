import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Code } from 'src/code/entities/code.entity';
import { Status } from 'src/status/entities/status.entity';
import { User } from 'src/user/entities/user.entity';
export type OrderDocument = Order & Document;
export class Order {
  @Prop()
  totalPrice: number;

  @Prop()
  subTotal: number;

  @Prop({ default: Date.now })
  dateOrder: Date;

  @Prop()
  dateShip: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Code' })
  discount: Code;

  @Prop()
  isPayment: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Status' })
  status: Status;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
