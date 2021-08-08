import { GoogleService } from './google.service';
export declare class GoogleController {
    private readonly googleService;
    constructor(googleService: GoogleService);
    checkTotkenId(tokenId: string): Promise<{
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
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
