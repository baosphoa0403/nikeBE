import { Strategy } from 'passport-jwt';
import { Payload } from './role/payload';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: Payload): Promise<Payload>;
}
export {};
