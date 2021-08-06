import { Model } from 'mongoose';
import { Role } from 'src/role/entities/role.entity';
import { Status } from 'src/status/entities/status.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { IdUserDto } from './dto/id-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private userModel;
    private roleModel;
    private StatusModel;
    constructor(userModel: Model<User>, roleModel: Model<Role>, StatusModel: Model<Status>);
    private hashPassword;
    findStatusWithName(name: string): Promise<Status>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findAllUser(): Promise<User[]>;
    findOneUser(idUserDto: IdUserDto): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
    updateUser(idUserDto: IdUserDto, updateUserDto: UpdateUserDto): Promise<User>;
    removeUser(idUserDto: IdUserDto): Promise<string>;
}
