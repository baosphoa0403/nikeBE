import { Profile, Strategy } from 'passport-facebook';
import { FacebookService } from './facebook.service';
declare const FacebookStrategy_base: new (...args: any[]) => Strategy;
export declare class FacebookStrategy extends FacebookStrategy_base {
    private facebookService;
    constructor(facebookService: FacebookService);
    validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any, info?: any) => void): Promise<any>;
}
export {};
