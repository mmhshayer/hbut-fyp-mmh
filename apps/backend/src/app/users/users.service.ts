import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { RoleAtCompany } from '../../common/enumerators';
import { Association } from './association.schema';
import { AssociationService } from './association.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly associationService: AssociationService
  ) {}

  findOneByEmail(email: string, excludePassword = true) {
    return this.userModel
      .findOne({ email })
      .select(excludePassword ? '-password' : null);
  }

  async createUser(user: User, password: string) {
    const exists = await this.userModel.exists({ email: user.email });
    if (exists) {
      throw new ConflictException('User already exists');
    }
    const newUser = await this.userModel.create({
      ...user,
      password,
    });
    const { password: _, ...rest } = newUser.toObject();
    return rest;
  }

  async addCompanyToUser(
    userId: Types.ObjectId | string,
    companyId: Types.ObjectId | string,
    role: RoleAtCompany
  ) {
    const user = await this.userModel.findById(userId.toString()).populate<{
      associations: Association[];
    }>('associations');

    const exists = user.associations.some(
      (association) => association.company.toString() === companyId.toString()
    );
    if (exists) {
      return user;
    }

    const association = await this.associationService.create(
      userId,
      companyId,
      role
    );

    return await this.userModel
      .findByIdAndUpdate(
        user._id,
        {
          $push: {
            associations: association._id,
          },
        },
        { new: true }
      )
      .populate<{
        associations: Association[];
      }>('associations');
  }
}
