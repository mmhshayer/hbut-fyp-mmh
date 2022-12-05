import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsString } from "class-validator";
import mongoose, { Types } from "mongoose";

export type ProductDocument = Product & mongoose.Document;
export type ProductDocumenttWithId = ProductDocument & { _id: Types.ObjectId };

@Schema({ timestamps: true })
export class Product {
    @IsString()
    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @IsString()
    @Prop({
        type: String,
        required: true,
    })
    price: number;

    @IsString()
    @Prop({
        type: String,
        required: false,
    })
    description: string;

    @IsString()
    @Prop({
        type: String,
        required: false,
    })
    image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
