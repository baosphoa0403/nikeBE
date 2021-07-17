import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { StatusModule } from './status/status.module';
import { SizeModule } from './size/size.module';
@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    StatusModule,
    SizeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
