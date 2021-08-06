import { ListRole } from 'src/auth/role/role.enum';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: ListRole[]) => import("@nestjs/common").CustomDecorator<string>;
