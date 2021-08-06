import { AuthService } from 'src/auth/auth.service';
import { FacebookService } from './facebook.service';
export declare class FacebookController {
    private authService;
    private facebookService;
    constructor(authService: AuthService, facebookService: FacebookService);
    facebookLogin(): Promise<any>;
    facebookLoginRedirect(req: any): Promise<any>;
}
