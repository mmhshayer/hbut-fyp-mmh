import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocumentWithId } from '../users';
import { OrderItemService } from './order-item.service';
import { CreateOrderDto } from './order.dto';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly orderItemService: OrderItemService,
  ) { }

  async create(user: UserDocumentWithId, createOrderDto: CreateOrderDto) {
    const items = await Promise.all(
      createOrderDto.items.map((item) => this.orderItemService.create(item))
    );
    return await this.orderModel.create({
      ...createOrderDto,
      user: user._id,
      items,
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

  async findAllByCompany(id: string) {
    return await this.orderModel.find({
      items: {
        $elemMatch: {
          company: id,
        },
      },
    }).populate('user');
  }
}
