import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
export type SizeDocument = Size & Document;

@Schema()
export class Size {
  @Prop({ String, required: [true, 'nameSize is required'] })
  @ApiProperty()
  nameSize: string;
}

export const SizeSchema = SchemaFactory.createForClass(Size);
