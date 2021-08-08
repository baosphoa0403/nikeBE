import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoogleService } from './google.service';
@ApiTags('Google')
@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  // @Get()
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(@Req() req) {}

  // @Get('redirect')
  // @UseGuards(AuthGuard('google'))
  // googleAuthRedirect(@Req() req) {
  //   return this.googleService.googleLogin(req);
  // }

  @Get(':tokenId')
  @ApiResponse({
    status: 200,
    description: 'login with google by send tokenId',
  })
  checkTotkenId(@Param('tokenId') tokenId) {
    return this.googleService.googleLogin(tokenId);
  }
}
