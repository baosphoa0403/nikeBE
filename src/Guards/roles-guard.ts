import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type } from 'os';
import { Observable } from 'rxjs';
import { Role } from 'src/auth/role/role.enum';
import { User } from 'src/user/entities/user.entity';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user: any = request.user;
    console.log(user);
    console.log(
      roles.some((role) => {
        user.roleName.includes(role);
      }),
    );
    return roles.some((role) => {
      console.log(typeof role);
      console.log(typeof user.roleName);
      user.roleName == role;
    });
  }
}
