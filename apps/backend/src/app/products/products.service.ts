import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Product } from './product.schema';
import { generatePermalink } from '../../core/utils/permalink.util';
import { CompanyService } from '../company/company.service';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly companyService: CompanyService,
  ) { }


  async create(id: string, createProductDto: CreateProductDto) {
    const company = await this.companyService.getCompanyById(id);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const newProduct = new this.productModel({
      ...createProductDto,
      company: company._id.toString(),
      permalink: generatePermalink(createProductDto.name),
    });

    return await newProduct.save();
  }

  async findAll() {
    return await this.productModel.find().populate('company').exec();
  }

  async findOne(product: string) {
    const exists = await this.productModel.findOne({ name: product }).populate('company').exec();
    if (!exists) {
      throw new NotFoundException('Product not found');
    }
    return exists;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async remove(permalink: string) {
    return await this.productModel.findOneAndDelete({ permalink });
  }

  async getProductsOfCompany(company: string) {
    return await this.productModel.find
      ({ company })
      .populate('company')
      .exec();
  }
}
