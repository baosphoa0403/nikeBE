import * as mongoose from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
export declare type ProductDocument = Product & Document;
export declare class Product {
    name: string;
    category: Category;
    createDate: Date;
}
export declare const ProductSchema: mongoose.Schema<mongoose.Document<Product, any, any>, mongoose.Model<any, any, any>, undefined, any>;
