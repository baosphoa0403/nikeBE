import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;
export class Product {
  @Prop()
  name: string;

  @Prop()
  size: string;

  @Prop()
  color: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
