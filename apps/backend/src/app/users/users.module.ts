import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Association, AssociationSchema } from './association.schema';
import { User, UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AssociationService } from './association.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: Association.name,
        schema: AssociationSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AssociationService],
  exports: [UsersService],
})
export class UsersModule {}
