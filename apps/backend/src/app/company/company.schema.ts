import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsMongoId, IsString } from 'class-validator';
import mongoose, { Types } from 'mongoose';
import { Status } from '../../common/enumerators/status.enum';
import { User } from '../users';

export type CompanyDocument = Company & mongoose.Document;
export type CompanyDocumentWithId = CompanyDocument & { _id: Types.ObjectId };

@Schema({ timestamps: true })
export class Company {
  @IsString()
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @IsEnum(Status)
  @Prop({
    type: String,
    enum: Status,
    default: Status.Active,
  })
  status: Status;

  @IsMongoId()
  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: User.name,
      },
    ],
  })
  users: string[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
