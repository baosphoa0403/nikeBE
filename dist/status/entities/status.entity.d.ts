import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
export declare type StatusDocument = Status & Document;
export declare class Status {
    nameStatus: string;
    listProduct: Product[];
}
export declare const StatusSchema: mongoose.Schema<Document<Status, any, any>, mongoose.Model<any, any, any>, undefined, any>;
