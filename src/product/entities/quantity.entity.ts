import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Size } from 'src/size/entities/size.entity';
import { ProductDetail } from './product-detail.entity';
export type QuantityDocument = Quantity & Document;
@Schema()
export class Quantity {
  @Prop()
  quantity: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Size' })
  size: Size;

  @Prop()
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductDetail' })
  productDetail: ProductDetail;
}
export const QuantitySchema = SchemaFactory.createForClass(Quantity);
