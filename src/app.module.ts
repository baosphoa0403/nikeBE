import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { StatusModule } from './status/status.module';
import { GenderModule } from './gender/gender.module';
import { SizeModule } from './size/size.module';
import { ColorModule } from './color/color.module';
import { CategoryModule } from './category/category.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { GoogleModule } from './google/google.module';
import { AuthModule } from './auth/auth.module';
import { FacebookModule } from './facebook/facebook.module';
import * as mongoose from 'mongoose';
import { LoggerMiddleware } from './middleware/logger-middleware';
import { CategoryController } from './category/category.controller';
mongoose.set('useCreateIndex', true);
@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    StatusModule,
    GenderModule,
    SizeModule,
    ColorModule,
    CategoryModule,
    RoleModule,
    UserModule,
    GoogleModule,
    AuthModule,
    FacebookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CategoryController);
    console.log(consumer);
  }
}
