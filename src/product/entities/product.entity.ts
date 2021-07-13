import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Status } from 'src/status/entities/status.entity';
export type ProductDocument = Product & Document;
@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  size: string;

  @Prop()
  color: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Status' })
  status: Status;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
