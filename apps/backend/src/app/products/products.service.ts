import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Product } from './product.schema';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>
  ) { }


  async create(id: string, createProductDto: CreateProductDto) {
    return await this.productModel.create({ ...createProductDto, company: id });
  }

  async findAll() {
    return await this.productModel.find();
  }

  async findOne(product: string) {
    const exists = await this.productModel.findOne({ name: product }).populate('company');
    if (!exists) {
      throw new NotFoundException('Product not found');
    }
    return exists;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }

  async getProductsOfCompany(company: string) {
    return await this.productModel.find
      ({ company })
      .populate('company');
  }
}
