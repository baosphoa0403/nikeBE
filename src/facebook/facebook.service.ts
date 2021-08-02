import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FacebookService {
  constructor(private usersService: UserService) {}

  async checkExistUserByEmail(email: string): Promise<User> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      return null;
    }
    return user;
  }
}
