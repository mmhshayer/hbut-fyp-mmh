import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEnum, IsMongoId, IsNumber, IsOptional } from "class-validator";
import mongoose, { Types } from "mongoose";
import { OrderStatus } from "../../common/enumerators";
import { Product } from "../products/product.schema";
import { User, UserDocumentWithId, UserSchema } from "../users";

export type OrderDocument = Order & mongoose.Document;
export type OrderDocumenttWithId = OrderDocument & { _id: Types.ObjectId };

@Schema({
    _id: false,
    versionKey: false,
})
export class OrderProduct {
    @IsMongoId()
    @Prop({
        type: Types.ObjectId,
        ref: Product.name,
    })
    product: Product[];

    @IsNumber()
    @Prop({
        required: true,
    })
    quantity: number;
}

const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);

@Schema({ timestamps: true })
export class Order {

    @IsOptional()
    @Prop([{
        type: OrderProductSchema,
    }])
    products: OrderProduct[];

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

    @IsMongoId()
    @Prop({
        type: Types.ObjectId,
        ref: User.name,
    })
    user: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);