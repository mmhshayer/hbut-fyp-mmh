import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Document, Types } from 'mongoose';
import { Status } from '../../../common/enumerators/status.enum';

export type UserDocument = User & Document;
export type UserDocumentWithId = UserDocument & { _id: Types.ObjectId };

@Schema({ timestamps: true })
export class User {
  @IsString()
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @IsEmail()
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: false,
  })
  username: string;

  @IsString()
  @MinLength(8)
  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @IsOptional()
  @IsEnum(Status)
  @Prop({
    type: String,
    enum: Status,
    required: false,
    default: Status.Active,
  })
  status: Status;
}

export const UserSchema = SchemaFactory.createForClass(User);
