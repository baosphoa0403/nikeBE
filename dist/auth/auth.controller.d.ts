import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getProfile(req: any): any;
    login(data: User): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        info: {
            id: any;
            username: any;
            role: any;
        };
        access_token: string;
        message: string;
    }>;
}
