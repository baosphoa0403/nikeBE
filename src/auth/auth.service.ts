import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    console.log('auth.service');
    const user = await this.usersService.findUserByEmail(email);

    if (user && user.password === pass) {
      return user;
    }
    return null;
  }
  async login(user: any) {
    console.log(user);

    const payload = {
      username: user.username,
      userId: user._id,
      roleName: user.role.nameRole,
    };
    return {
      access_token: this.jwtService.sign(payload),
      message: 'login successfully',
    };
  }
}
