import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsMongoId, IsOptional, IsString } from "class-validator";
import mongoose, { Types } from "mongoose";
import { Company } from "../company";


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

    @IsOptional()
    @IsMongoId()
    @Prop({
        type: Types.ObjectId,
        ref: Company.name
    })
    company: Company;

    @IsOptional()
    @IsString()
    @Prop({
        type: String,
        required: false,
    })
    description?: string;

    @IsOptional()
    @IsString()
    @Prop({
        type: String,
        required: false,
    })
    image?: string;

    @IsString()
    @Prop({
        type: String,
        required: true,
    })
    permalink?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
