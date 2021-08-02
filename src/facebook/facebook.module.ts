import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { FacebookStrategy } from './facebook-strategy';
import { FacebookController } from './facebook.controller';
import { FacebookService } from './facebook.service';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [FacebookController],
  providers: [FacebookStrategy, FacebookService],
})
export class FacebookModule {}
