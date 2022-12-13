import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';
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

  @Get('company/:id')
  async findAllByCompany(@Param('id') id: string) {
    return await this.ordersService.findAllByCompany(id);
  }

  @Put(':id')
  async update(@Param('id') id: string) {
    console.log(id)
    return await this.ordersService.update(id);
  }

  @Post('pos/:id')
  async createPos(@Param('id') id: string, @Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.createPos(id, createOrderDto);
  }
}
