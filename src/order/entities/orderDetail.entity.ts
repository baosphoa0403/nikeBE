import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Order } from "./order.entity";
import * as mongoose from 'mongoose';
export type OrderDetailDocument = OrderDetail & Document;
export class OrderDetail {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order'})
    order: Order

    @Prop()
    nameProduct: string

    @Prop()
    price: number

    @Prop()
    categoryName: string

    @Prop()
    color: string

}
export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);