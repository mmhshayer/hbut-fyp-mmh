import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findOneByUsername(username: string, excludePassword = true) {
    return this.userModel
      .findOne({ username })
      .select(excludePassword ? '-password' : null);
  }

  async createUser(username: string, password: string) {
    const exists = await this.userModel.exists({ username });
    if (exists) {
      throw new ConflictException('User already exists');
    }
    const newUser = await this.userModel.create({
      username,
      password,
    });
    const { password: _, ...user } = newUser.toObject();
    return user;
  }
}
