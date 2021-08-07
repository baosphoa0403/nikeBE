import { HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
export declare class FacebookService {
    private usersService;
    private authService;
    constructor(usersService: UserService, authService: AuthService);
    loginFacebook(req: any): Promise<{
        info: {
            id: any;
            username: any;
            role: any;
        };
        access_token: string;
        message: string;
    } | {
        data: any;
        statusCode: HttpStatus;
    }>;
}
