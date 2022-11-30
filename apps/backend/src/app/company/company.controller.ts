import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto, UpdateCompanyDto } from './company.dto';
import { ReqUser } from '../../common/decorators';
import { UserDocumentWithId } from '../users';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(
    @ReqUser() user: UserDocumentWithId,
    @Body() createCompanyDto: CreateCompanyDto
  ) {
    return await this.companyService.create(user, createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }

  @Get('list')
  async getCompaniesOfUser(@ReqUser() user: UserDocumentWithId) {
    console.log('getCompaniesOfUser', user._id);
    return await this.companyService.getCompaniesOfUser(user._id);
  }
}
