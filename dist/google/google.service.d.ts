import { HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
export declare class GoogleService {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    googleLogin(req: any): Promise<{
        access_token: string;
        message: string;
    } | {
        data: any;
        statusCode: HttpStatus;
    }>;
}
