import { PartialType, PickType } from "@nestjs/swagger";
import { Order } from './order.schema';

export class CreateOrderDto extends PickType(Order, [
    'products',
    'total',
] as const) { }

export class UpdateOrderDto extends PartialType(CreateOrderDto) { }
