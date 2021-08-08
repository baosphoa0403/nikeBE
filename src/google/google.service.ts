import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

@Injectable()
export class GoogleService {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  async googleLogin(tokenId) {
    const payload: TokenPayload = await this.verifyToken(tokenId);

    if (!payload.email_verified) {
      throw new BadRequestException('Email not already verify');
    }

    const user = await this.userService.findUserByEmail(payload.email);
    if (user == null) {
      const data = {
        email: payload.email,
        name: payload.name,
      };
      return {
        data: data,
        statusCode: HttpStatus.PERMANENT_REDIRECT,
      };
    }
    return this.authService.login(user);
  }

  async verifyToken(tokenId) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
  }
}
