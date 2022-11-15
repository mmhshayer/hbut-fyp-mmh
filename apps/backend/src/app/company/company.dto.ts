import { PickType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { Company } from './company.schema';

export class CreateCompanyDto extends PickType(Company, ['name'] as const) {}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
