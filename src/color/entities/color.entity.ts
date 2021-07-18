import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
export type ColorDocument = Color & Document;

@Schema()
export class Color {
  @Prop({ type: String, required: [true, 'nameColor is required'] })
  @ApiProperty()
  nameColor: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
