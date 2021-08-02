import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
export type ProductDocument = Product & Document;
@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
  category: Category;

}
export const ProductSchema = SchemaFactory.createForClass(Product);
