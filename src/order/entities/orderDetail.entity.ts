import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Order } from './order.entity';
import * as mongoose from 'mongoose';
export type OrderDetailDocument = OrderDetail & Document;
@Schema()
export class OrderDetail {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order: Order;

  @Prop()
  nameProduct: string;

  @Prop()
  categoryName: string;

  @Prop()
  size: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop()
  color: string;
}
export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
