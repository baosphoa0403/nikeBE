/// <reference types="mongoose" />
export declare type GenderDocument = Gender & Document;
export declare class Gender {
    nameGender: string;
}
export declare const GenderSchema: import("mongoose").Schema<import("mongoose").Document<Gender, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
