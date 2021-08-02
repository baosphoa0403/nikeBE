import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from './Guards/roles-guard';
import { Roles } from './Guards/roles.decorator';
// import { AuthService } from './auth/auth.service';
// import { Roles } from './Guards/roles.decorator';

@Controller()
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // @Roles('admin')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Get('/hello')
  // @Roles('user')
  // getAll(): string {
  //   return 'everyone have access resource';
  // }
}
