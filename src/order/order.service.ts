import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isNotEmpty } from 'class-validator';
import { Model } from 'mongoose';
import { Payload } from 'src/auth/role/payload';
import { ListRole } from 'src/auth/role/role.enum';
import { Category } from 'src/category/entities/category.entity';
import { CodeDetailService } from 'src/code-detail/code-detail.service';
import { CodeDetail } from 'src/code-detail/entities/code-detail.entity';
import { Code } from 'src/code/entities/code.entity';
import { StatusEnum } from 'src/common/status.enum';
import { ProductDetail } from 'src/product/entities/product-detail.entity';
import { Quantity } from 'src/product/entities/quantity.entity';
import { Role } from 'src/role/entities/role.entity';
import { Size } from 'src/size/entities/size.entity';
import { Status } from 'src/status/entities/status.entity';
import { StatusService } from 'src/status/status.service';
import { User } from 'src/user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/orderDetail.entity';
import { OrderUserResponse, OrderUsersResponse } from './response/order-user';

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
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}
  async create(createOrderDto: CreateOrderDto, payload: Payload) {
    const { dateShip, idDiscount, listDetailProduct,isPayment } = createOrderDto;
    const statusActive = await this.statusService.findByName(StatusEnum.Active);
    const statusInactive = await this.statusService.findByName(
      StatusEnum.Inactive,
    );
    const statusPending = await this.statusService.findByName(
      StatusEnum.Pending,
    );

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
    let totalPrice = 0;
    let discount = null;
    if (idDiscount) {
      const code = await this.codeModel.findById(idDiscount);
      discount = await this.codeDetailModel
        .findOneAndUpdate(
          { code: code, user: user, status: statusActive },
          { status: statusInactive },
        )
        .populate('code');
      console.log(discount);

      if (!discount) throw new BadRequestException('Code discount invalid');
      totalPrice =
        subTotalPrice - (subTotalPrice * discount.code.codeValue) / 100;
    } else {
      totalPrice = subTotalPrice;
    }

    const order = await new this.orderModel({
      totalPrice,
      subTotalPrice,
      dateShip,
      user: user,
      discount: discount ? discount.code : null,
      isPayment: isPayment,
      status: statusPending,
    }).save();

    for (const item of arrayProduct) {
      const quantity = item[0].quantity - item[1];
      await this.quantityModel.findByIdAndUpdate(
        { _id: item[0]._id },
        { quantity: quantity },
      );
      const detail = await this.productDetailModel
        .findById(item[0].productDetail)
        .populate('product');
      const category = await this.categoryModel.findById(
        detail.product.category,
      );

      await new this.orderDetailModel({
        order: order,
        nameProduct: detail.product.name,
        categoryName: category.nameCategory,
        size: item[0].size.nameSize,
        quantity: item[1],
        price: item[0].price,
        color: item[0].productDetail.color,
      }).save();
    }
    return {
      message: 'Order successful',
    };
  }

  async findAllByUser(userId: string) {
    const user = await this.userModel.findById(userId);
    const result: OrderUserResponse[] = [];
    const historyOrder = await this.orderModel
      .find({ user }, { user: 0, __v: 0 })
      .populate('discount', { _id: 0, __v: 0, createDate: 0 }).populate("status", {_id: 0, __v: 0});

    for (const item of historyOrder) {
      const details = await this.orderDetailModel.find({ order: item });
      result.push({ info: item, products: details });
    }

    return result;
  }
  async findAll() {
    const role = await this.roleModel.findOne({ nameRole: ListRole.User });
    const users = await this.userModel
      .find({ role: role })
      .populate('status', { _id: 0, __v: 0 })
      .populate('role', { _id: 0, __v: 0 });
    const result: OrderUsersResponse[] = [];
    for (const user of users) {
      const orders: OrderUserResponse[] = [];
      const historyOrder = await this.orderModel
        .find({ user }, { user: 0, __v: 0 })
        .populate('discount', { _id: 0, __v: 0, createDate: 0 })
        .populate("status", { _id: 0, __v: 0 });        
      for (const item of historyOrder) {
        const details = await this.orderDetailModel.find({ order: item });
        orders.push({ info: item, products: details });
      }
      result.push({ user: user, orders: orders });
    }
    return result;
  }
  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const { idStatus} = updateOrderDto;
    const status = await this.statusModel.findById({_id: idStatus});
    await this.orderModel.findByIdAndUpdate(id,{status: status});    
    return `update successfully ${id} order ${status.nameStatus}`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
