import { forwardRef, Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Status, StatusSchema } from './entities/status.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Status.name, schema: StatusSchema }]),
  ],
  controllers: [StatusController],
  providers: [StatusService],
  exports: [StatusService],
})
export class StatusModule {}
