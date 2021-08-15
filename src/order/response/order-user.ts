import { User } from 'src/user/entities/user.entity';
import { Order } from '../entities/order.entity';
import { OrderDetail } from '../entities/orderDetail.entity';

export class OrderUserResponse {
  info: Order;
  products: OrderDetail[];
}

export class OrderUsersResponse {
  user: User;
  orders: OrderUserResponse[];
}
