import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { ReqUser } from '../../common/decorators';
import { UserDocumentWithId } from '../users';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async create(@ReqUser() user: UserDocumentWithId, @Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(user, createOrderDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}
