import { AuthService } from './auth.service';
import { Payload } from './role/payload';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getProfile(req: any): any;
    login(payload: Payload): Promise<{
        access_token: string;
        message: string;
    }>;
}
