import { GoogleService } from './google.service';
export declare class GoogleController {
    private readonly googleService;
    constructor(googleService: GoogleService);
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): Promise<{
        info: {
            id: any;
            username: any;
            role: any;
        };
        access_token: string;
        message: string;
    } | {
        data: any;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
