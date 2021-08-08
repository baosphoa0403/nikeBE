import { HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { TokenPayload } from 'google-auth-library';
export declare class GoogleService {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    googleLogin(tokenId: any): Promise<{
        statusCode: HttpStatus;
        info: {
            id: any;
            username: any;
            role: any;
        };
        access_token: string;
        message: string;
    } | {
        data: {
            email: string;
            name: string;
        };
        statusCode: HttpStatus;
    }>;
    verifyToken(tokenId: any): Promise<TokenPayload>;
}
