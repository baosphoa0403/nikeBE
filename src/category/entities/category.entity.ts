import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
export type CategoryDocument = Category & Document;
@Schema()
export class Category {
  @Prop()
  nameCategory: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
