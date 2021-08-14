import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isNotEmpty } from 'class-validator';
import { Model } from 'mongoose';
import { Payload } from 'src/auth/role/payload';
import { CodeDetailService } from 'src/code-detail/code-detail.service';
import { CodeDetail } from 'src/code-detail/entities/code-detail.entity';
import { Code } from 'src/code/entities/code.entity';
import { StatusEnum } from 'src/common/status.enum';
import { ProductDetail } from 'src/product/entities/product-detail.entity';
import { Quantity } from 'src/product/entities/quantity.entity';
import { Size } from 'src/size/entities/size.entity';
import { Status } from 'src/status/entities/status.entity';
import { StatusService } from 'src/status/status.service';
import { User } from 'src/user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/orderDetail.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(OrderDetail.name) private orderDetailModel: Model<OrderDetail>,
    @InjectModel(ProductDetail.name)
    private productDetailModel: Model<ProductDetail>,
    @InjectModel(Quantity.name) private quantityModel: Model<Quantity>,
    @InjectModel(Size.name) private sizeModel: Model<Size>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Status.name) private statusModel: Model<Status>,
    private statusService: StatusService,
    @InjectModel(CodeDetail.name) private codeDetailModel: Model<CodeDetail>,
    @InjectModel(Code.name) private codeModel: Model<Code>,
  ) {}
  async create(createOrderDto: CreateOrderDto, payload: Payload) {
    const { dateShip, idDiscount, listDetailProduct } = createOrderDto;
    const statusActive = await this.statusService.findByName(StatusEnum.Active);
    const arrayProduct = new Map();
    let subTotalPrice = 0;
    const mess = [];
    for (const item of listDetailProduct) {
      const detail = await this.productDetailModel.findById(
        item.idDetailProduct,
      );
      const size = await this.sizeModel.findById(item.sizeId);
      const quantity = await this.quantityModel.findOne({
        productDetail: detail,
        size: size,
        $and: [{ quantity: { $gt: 0 } }, { quantity: { $gt: item.quantity } }],
      });
      if (!quantity) {
        mess.push(item.idDetailProduct);
      } else {
        subTotalPrice += quantity.price * item.quantity;
        arrayProduct.set(quantity, item.quantity);
      }
    }
    if (mess.length > 0) {
      throw new BadRequestException(mess);
    }

    const user = await this.userModel.findById(payload.userId);
    const code = await this.codeModel.findById(idDiscount);
    const discount = await (
      await this.codeDetailModel.findOne({ code: code, user: user })
    ).populated('code');
    if (!discount) throw new BadRequestException('Code discount invalid');
    const totalPrice = subTotalPrice * discount.code.codeValue;
    const order = await new this.orderModel({
      totalPrice: totalPrice,
      subTotalPrice: subTotalPrice,
      dateShip: dateShip,
      user: user,
      discount: discount.code.codeValue,
      isPayment: false,
      status: statusActive,
    });
    for (const item of arrayProduct) {
      const quantity = item[0].quantity - item[1];
      await this.quantityModel.findByIdAndUpdate(
        { _id: item[0]._id },
        { quantity: quantity },
      );
      await new this.orderDetailModel({
        order: order,
        nameProduct: item[0].productDetail.product.name,
        categoryName: item[0].productDetail.product.category.nameCategory,
        size: item[0].size.nameSize,
        quantity: item[0].quantity,
        price: item[0].price,
        color: item[0].productDetail.color,
      });
    }

    return {
      message: 'Order successful',
    };
  }

  findAllByUser(payload: Payload) {
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
