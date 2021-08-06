import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IdUserDto } from './dto/id-user.dto';
import { Payload } from 'src/auth/role/payload';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(payload: Payload): Promise<User>;
    update(payload: Payload, updateUserDto: UpdateUserDto): Promise<User>;
    remove(idUserDto: IdUserDto): Promise<string>;
}
