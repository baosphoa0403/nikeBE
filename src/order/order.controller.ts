import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/Guards/roles.decorator';
import { ListRole } from 'src/auth/role/role.enum';
import { GetUser } from 'src/Decorator/decorator';
import { Payload } from 'src/auth/role/payload';
import { JwtAuthGuard } from 'src/Guards/jwt-auth-guard';
import { RolesGuard } from 'src/Guards/roles-guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(ListRole.User)
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() payload: Payload) {
    return this.orderService.create(createOrderDto, payload);
  }

  @Get('/history/me')
  @Roles(ListRole.User)
  findAllByUser(@GetUser() user: Payload) {
    return this.orderService.findAllByUser(user.userId);
  }

  @Get('/history/:id')
  @Roles(ListRole.Admin)
  findOrderByUser(@Param('id') id: string) {
    return this.orderService.findAllByUser(id);
  }

  @Get('/list-history')
  @Roles(ListRole.Admin)
  findAll() {
    return this.orderService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}
