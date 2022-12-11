import { Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

export type OrderDocument = Order & mongoose.Document;
export type OrderDocumenttWithId = OrderDocument & { _id: Types.ObjectId };


@Schema({ timestamps: true })
export class Order { }

export const OrderSchema = SchemaFactory.createForClass(Order);