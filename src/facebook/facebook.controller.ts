import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { FacebookService } from './facebook.service';
@ApiTags('Facebook')
@Controller('facebook')
export class FacebookController {
  constructor(
    private authService: AuthService,
    private facebookService: FacebookService,
  ) {}
  @Get()
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: any): Promise<any> {
    return this.facebookService.loginFacebook(req);
  }
}
