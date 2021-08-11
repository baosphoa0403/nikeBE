import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusEnum } from 'src/common/status.enum';
import { ProductDetail } from 'src/product/entities/product-detail.entity';
import { StatusService } from 'src/status/status.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/orderDetail.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(OrderDetail.name) private orderDetailMode: Model<OrderDetail>,
    @InjectModel(ProductDetail.name) private productDetailModel: Model<ProductDetail> ,
    private statusService: StatusService
  ){}
  async create(createOrderDto: CreateOrderDto) {
    const {dateShip,idDiscount,listIdDetailProduct} = createOrderDto;
    const statusActive = await this.statusService.findByName(StatusEnum.Active);
    const arrayProductProblem = [];
    for (const idDetailProduct of listIdDetailProduct) {
      const productDetail = await this.productDetailModel.findOne({_id: idDetailProduct, quantity: {$gt: 0}, status: statusActive});
      if (!productDetail) {
        arrayProductProblem.push(idDetailProduct);
      }else{

      }
    }
    if (arrayProductProblem.length > 0 ) {
      // zomai code tiep :))
      
    }
    console.log(createOrderDto);
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
