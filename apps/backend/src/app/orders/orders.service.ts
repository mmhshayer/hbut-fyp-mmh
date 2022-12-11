import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocumentWithId } from '../users';
import { CreateOrderDto } from './order.dto';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) { }

  async create(user: UserDocumentWithId, createOrderDto: CreateOrderDto) {
    return await this.orderModel.create({
      ...createOrderDto,
      user: user._id,
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

  async findAllByCompany(id: string) {
    const data: Order[] = await this.orderModel.find().populate([
      {
        path: 'products.product',
      },
    ]).exec();

    const filteredData = data.filter((order) => {
      return order.products.some((product) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return product.product.company.toString() === id;
      });
    })

    return filteredData;
  }
}
