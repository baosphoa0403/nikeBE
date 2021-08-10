import { Model } from 'mongoose';
import { Role } from 'src/role/entities/role.entity';
import { Status } from 'src/status/entities/status.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { IdUserDto } from './dto/id-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUserProfileDto } from './dto/create-userProfile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UpdatePassword } from './dto/update-password';
export declare class UserService {
    private userModel;
    private roleModel;
    private StatusModel;
    constructor(userModel: Model<User>, roleModel: Model<Role>, StatusModel: Model<Status>);
    private hashPassword;
    findStatusWithName(name: string): Promise<Status>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    createUserProfile(createUserDto: CreateUserProfileDto): Promise<User>;
    updatePassword({ password }: UpdatePassword, idUserDto: IdUserDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    findAllUser(): Promise<User[]>;
    findOneUser(idUserDto: IdUserDto): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
    updateUser(idUserDto: IdUserDto, updateUserDto: UpdateUserDto): Promise<User>;
    updateUserProfile(idUserDto: IdUserDto, updateUserProfileDto: UpdateUserProfileDto): Promise<User>;
    removeUser(idUserDto: IdUserDto): Promise<string>;
}
