import { OmitType, PartialType } from "@nestjs/swagger";
import { Product } from './product.schema';

export class CreateProductDto extends OmitType(Product, ['company'] as const) { }

export class UpdateProductDto extends PartialType(CreateProductDto) { }
