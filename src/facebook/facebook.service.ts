import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FacebookService {
  constructor(
    private usersService: UserService,
    private authService: AuthService,
  ) {}

  async loginFacebook(req) {
    if (!req.user) {
      throw new BadRequestException();
    }
    const user = await this.usersService.findUserByEmail(req.user.email);
    if (user == null) {
      return {
        data: req.user,
        statusCode: HttpStatus.PERMANENT_REDIRECT,
      };
    }
    return this.authService.login(user);
  }
}
