import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
export type StatusDocument = Status & Document;

@Schema()
export class Status {
  @Prop()
  nameStatus: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  listProduct: Product[];
}
export const StatusSchema = SchemaFactory.createForClass(Status);
