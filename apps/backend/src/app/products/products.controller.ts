import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { PublicRoute } from '../../common/decorators';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post(':id')
  async create(@Param('id') id: string, @Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(id, createProductDto);
  }

  @PublicRoute()
  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @PublicRoute()
  @Get(':product')
  async findOne(@Param('product') product: string) {
    return await this.productsService.findOne(product);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':permalink')
  async remove(@Param('permalink') permalink: string) {
    return await this.productsService.remove(permalink);
  }

  @PublicRoute()
  @Get('company/:company')
  async getProductsOfCompany(@Param('company') company: string) {
    return await this.productsService.getProductsOfCompany(company);
  }
}
