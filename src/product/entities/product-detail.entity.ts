import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Color } from "src/color/entities/color.entity";
import { Gender } from "src/gender/entities/gender.entity";
import { Status } from "src/status/entities/status.entity";
import { Product } from "./product.entity";
import * as mongoose from 'mongoose';
export type ProductDetailDocument = ProductDetail & Document;

@Schema()
export class ProductDetail{
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
    product: Product;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Status'})
    status: Status;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Color'})
    color: Color;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Gender'})
    gender: Gender

    @Prop()
    price: number;

    @Prop()
    quantity: number;
}
export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);
