import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/Guards/roles.decorator';
import { ListRole } from 'src/auth/role/role.enum';
import { GetUser } from 'src/Decorator/decorator';
import { Payload } from 'src/auth/role/payload';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(ListRole.User)
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() payload: Payload) {
    return this.orderService.create(createOrderDto, payload);
  }

  @Get()
  @Roles(ListRole.User)
  findAll(@GetUser() user: Payload) {
    return this.orderService.findAllByUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
