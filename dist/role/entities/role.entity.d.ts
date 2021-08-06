/// <reference types="mongoose" />
export declare type RoleDocument = Role & Document;
export declare class Role {
    nameRole: string;
}
export declare const RoleSchema: import("mongoose").Schema<import("mongoose").Document<Role, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
