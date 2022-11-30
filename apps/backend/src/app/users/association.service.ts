import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RoleAtCompany, Status } from '../../common/enumerators';
import { Association, AssociationDocument } from './association.schema';

@Injectable()
export class AssociationService {
  constructor(
    @InjectModel(Association.name)
    private associationModel: Model<AssociationDocument>
  ) {}

  async create(
    userId: Types.ObjectId | string,
    companyId: Types.ObjectId | string,
    role: RoleAtCompany,
    status: Status = Status.Inactive
  ) {
    return await this.associationModel.create({
      user: userId.toString(),
      company: companyId.toString(),
      role,
      status,
    });
  }
}
