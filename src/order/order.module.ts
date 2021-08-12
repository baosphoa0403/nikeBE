import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { OrderDetail, OrderDetailSchema } from './entities/orderDetail.entity';
import { ProductDetail, ProductDetailSchema } from 'src/product/entities/product-detail.entity';
import { StatusModule } from 'src/status/status.module';
import { CodeDetailModule } from 'src/code-detail/code-detail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Order.name, schema: OrderSchema},
      {name: OrderDetail.name, schema: OrderDetailSchema},
      {name: ProductDetail.name, schema: ProductDetailSchema}
    ]),
    StatusModule,
    CodeDetailModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
