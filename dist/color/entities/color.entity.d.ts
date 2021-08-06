/// <reference types="mongoose" />
export declare type ColorDocument = Color & Document;
export declare class Color {
    nameColor: string;
}
export declare const ColorSchema: import("mongoose").Schema<import("mongoose").Document<Color, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
