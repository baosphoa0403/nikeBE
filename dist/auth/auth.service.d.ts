import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<User>;
    login(user: any): Promise<{
        info: {
            id: any;
            username: any;
            role: any;
        };
        access_token: string;
        message: string;
    }>;
}
