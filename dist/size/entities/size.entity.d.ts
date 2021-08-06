/// <reference types="mongoose" />
export declare type SizeDocument = Size & Document;
export declare class Size {
    nameSize: string;
}
export declare const SizeSchema: import("mongoose").Schema<import("mongoose").Document<Size, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
