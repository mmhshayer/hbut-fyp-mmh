import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocumentWithId, UsersService } from '../users';
import { CreateCompanyDto, UpdateCompanyDto } from './company.dto';
import { Company } from './company.schema';
import { RoleAtCompany } from '../../common/enumerators';
import { generatePermalink } from '../../core/utils/permalink.util';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private readonly companyModel: Model<Company>,
    private readonly userService: UsersService
  ) {}

  async create(user: UserDocumentWithId, createCompanyDto: CreateCompanyDto) {
    const exists = await this.companyModel.exists({
      name: createCompanyDto.name,
    });
    if (exists) {
      throw new ConflictException('Company already exists');
    }
    const company = await this.companyModel.create({
      ...createCompanyDto,
      users: [user._id],
      permalink: generatePermalink(createCompanyDto.name),
    });

    await this.userService.addCompanyToUser(
      user._id,
      company._id,
      RoleAtCompany.PrimaryAccount
    );

    return company;
  }

  findAll() {
    return `This action returns all company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }

  async getCompaniesOfUser(_id: string) {
    return await this.companyModel.find({
      users: _id,
    });
  }

  async getCompanyByName(permalink: string) {
    const exists = await this.companyModel.findOne({
      permalink,
    });
    if (!exists) {
      throw new NotFoundException('Company not found');
    }
    return exists;
  }
}
