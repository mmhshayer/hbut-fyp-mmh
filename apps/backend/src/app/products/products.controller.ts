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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(id);
  }
}
