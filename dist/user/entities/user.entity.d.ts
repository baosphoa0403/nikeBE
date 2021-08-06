import * as mongoose from 'mongoose';
import { Role } from 'src/role/entities/role.entity';
import { Status } from 'src/status/entities/status.entity';
export declare type UserDocument = User & Document;
export declare class User {
    username: string;
    password: string;
    email: string;
    name: string;
    yearOfBirth: Date;
    address: string;
    status: Status;
    role: Role;
}
export declare const UserSchema: mongoose.Schema<mongoose.Document<User, any, any>, mongoose.Model<any, any, any>, undefined, any>;
