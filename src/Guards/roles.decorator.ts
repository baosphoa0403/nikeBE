import { SetMetadata } from '@nestjs/common';
import { ListRole } from 'src/auth/role/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ListRole[]) => SetMetadata(ROLES_KEY, roles);
