import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/Guards/local-auth-guard';
import { JwtAuthGuard } from '../Guards/jwt-auth-guard';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'login user',
  })
  @ApiBody({ type: LoginDTO })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
