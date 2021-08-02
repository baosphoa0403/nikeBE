import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { FacebookService } from './facebook.service';

@Controller('login')
export class FacebookController {
  constructor(
    private authService: AuthService,
    private facebookService: FacebookService,
  ) {}
  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: any): Promise<any> {
    const user = await this.facebookService.checkExistUserByEmail(
      req.user.data.email,
    );
    if (user == null) {
      return {
        data: req.user,
        statusCode: HttpStatus.PERMANENT_REDIRECT,
      };
    }
    return this.authService.login(user);
  }
}
