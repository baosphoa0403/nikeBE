import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleService {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  async googleLogin(req) {
    if (!req.user) {
      throw new BadRequestException();
    }
    const user = await this.userService.findUserByEmail(req.user.email);
    if (user == null) {
      return {
          data: req.user,
          statusCode: HttpStatus.PERMANENT_REDIRECT,
      };
    }
    return this.authService.login(user);
  }
}
