import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { RoleAtCompany } from '../../common/enumerators';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findOneByEmail(email: string, excludePassword = true) {
    return this.userModel
      .findOne({ email })
      .select(excludePassword ? '-password' : null);
  }

  async createUser(user: User, password: string) {
    console.log(password, user);
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
    const user = await this.userModel.findById(userId.toString());
    if (user) {
      return user;
    }
    return 'This action adds a new company to user';
  }
}
