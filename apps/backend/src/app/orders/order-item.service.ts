import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderItem, OrderItemDocument } from "./order-item.schema";

export class OrderItemService {
    constructor(
        @InjectModel(OrderItem.name)
        private orderItemModel: Model<OrderItemDocument>,
    ) { }

    async create(item) {
        return await this.orderItemModel.create(item);
    }
}