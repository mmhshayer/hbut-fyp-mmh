import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId, IsNumber } from 'class-validator';
import { Types } from 'mongoose';
import { Product } from '../products/product.schema';


export type OrderItemDocument = OrderItem & Document;
export type OrderItemDocumentWithId = OrderItemDocument & {
    _id: Types.ObjectId;
};

@Schema({
    timestamps: true,
})
export class OrderItem {
    @IsMongoId()
    @Prop({
        type: Types.ObjectId,
        ref: Product.name,
    })
    _id: string;

    @IsNumber()
    @Prop({
        required: true,
    })
    quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);