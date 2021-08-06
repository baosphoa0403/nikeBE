import { Color } from "src/color/entities/color.entity";
import { Gender } from "src/gender/entities/gender.entity";
import { Status } from "src/status/entities/status.entity";
import { Product } from "./product.entity";
import * as mongoose from 'mongoose';
import { Size } from "src/size/entities/size.entity";
export declare type ProductDetailDocument = ProductDetail & Document;
export declare class ProductDetail {
    product: Product;
    status: Status;
    color: Color;
    gender: Gender;
    size: Size;
    price: number;
    quantity: number;
}
export declare const ProductDetailSchema: mongoose.Schema<mongoose.Document<ProductDetail, any, any>, mongoose.Model<any, any, any>, undefined, any>;
