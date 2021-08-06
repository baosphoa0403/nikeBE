import * as mongoose from 'mongoose';
export declare type CategoryDocument = Category & Document;
export declare class Category {
    nameCategory: string;
}
export declare const CategorySchema: mongoose.Schema<mongoose.Document<Category, any, any>, mongoose.Model<any, any, any>, undefined, any>;
