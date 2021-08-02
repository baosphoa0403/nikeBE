import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { GoogleStrategy } from './google.strategy'

@Module({
  imports: [UserModule,AuthModule],
  controllers: [GoogleController],
  providers: [GoogleService, GoogleStrategy],
})
export class GoogleModule {}