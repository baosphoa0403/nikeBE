import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
export type ColorDocument = Color & Document;

@Schema()
export class Color {
  @Prop({ String, required: [true, 'nameColor is required'] })
  @ApiProperty()
  nameColor: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
