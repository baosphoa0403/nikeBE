import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
export type GenderDocument = Gender & Document;

@Schema()
export class Gender {
  @Prop({ String, required: [true, 'nameGender is required'] })
  @ApiProperty()
  nameGender: string;
}

export const GenderSchema = SchemaFactory.createForClass(Gender);
