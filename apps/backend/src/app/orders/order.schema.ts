import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEnum, IsMongoId, IsNumber, IsObject, IsOptional } from "class-validator";
import mongoose, { Types } from "mongoose";
import { OrderStatus } from "../../common/enumerators";
import { User } from "../users";
import { Product } from '../products/product.schema';

export type OrderDocument = Order & mongoose.Document;
export type OrderDocumenttWithId = OrderDocument & { _id: Types.ObjectId };


@Schema({ timestamps: true })
export class Order {

    @IsObject()
    @Prop({
        type: [{ item: { type: Types.ObjectId, ref: Product.name }, quantity: Number }],
    })
    items: Items[];

    @IsNumber()
    @Prop({
        required: true,
    })
    total: number;

    @IsEnum(OrderStatus)
    @Prop({
        type: String,
        enum: OrderStatus,
        default: OrderStatus.Processing,
    })
    status: OrderStatus;

    @IsOptional()
    @IsMongoId()
    @Prop({
        type: Types.ObjectId,
        ref: User.name,
    })
    users: User;
}

export class Items {
    @IsMongoId()
    @Prop({
        type: Types.ObjectId,
        ref: Product.name,
    })
    item: string;

    @IsNumber()
    @Prop({
        required: true,
    })
    quantity: number;
}



export const OrderSchema = SchemaFactory.createForClass(Order);