import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocumentWithId } from '../users';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) { }

  async create(user: UserDocumentWithId, createOrderDto: CreateOrderDto) {
    const order = new this.orderModel({
      ...createOrderDto,
      user: user._id,
    });
    return await order.save();
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }
}
