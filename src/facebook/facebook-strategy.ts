import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { AuthService } from 'src/auth/auth.service';
import { FacebookService } from './facebook.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private facebookService: FacebookService) {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: 'http://localhost:3000/login/facebook/redirect',
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;
    const data = {
      email: emails[0].value,
      name: name.givenName,
      username: name.familyName + ' ' + name.givenName,
      password: '123',
    };
    const payload = {
      data,
      accessToken,
    };
    done(null, payload);
  }
}
