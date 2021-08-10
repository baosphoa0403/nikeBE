import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IdUserDto } from './dto/id-user.dto';
import { Payload } from 'src/auth/role/payload';
import { CreateUserProfileDto } from './dto/create-userProfile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UpdatePassword } from './dto/update-password';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<User>;
    createUser(createUserProfileDto: CreateUserProfileDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(payload: Payload): Promise<User>;
    update(payload: Payload, updateUserDto: UpdateUserDto): Promise<User>;
    updateProfileUser(payload: Payload, updateUserProfileDto: UpdateUserProfileDto): Promise<User>;
    updatePassword(payload: Payload, password: UpdatePassword): Promise<{
        message: string;
        statusCode: number;
    }>;
    remove(idUserDto: IdUserDto): Promise<string>;
}
