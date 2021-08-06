import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type StatusDocument = Status & Document;
export declare class Status {
    nameStatus: string;
}
export declare const StatusSchema: mongoose.Schema<Document<Status, any, any>, mongoose.Model<any, any, any>, undefined, any>;
