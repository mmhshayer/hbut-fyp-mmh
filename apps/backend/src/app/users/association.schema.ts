import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { RoleAtCompany, Status } from '../../common/enumerators';

export type AssociationDocument = Association & Document;
export type AssociationDocumentWithId = AssociationDocument & {
  _id: Types.ObjectId;
};

@Schema({ timestamps: true })
export class Association {
  @IsString()
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: Types.ObjectId;

  @IsString()
  @Prop({
    type: Types.ObjectId,
    ref: 'Company',
    required: true,
  })
  company: Types.ObjectId;

  @IsEnum(RoleAtCompany)
  @Prop({
    type: String,
    enum: RoleAtCompany,
  })
  role: RoleAtCompany;

  @IsEnum(Status)
  @Prop({
    type: String,
    enum: Status,
    default: Status.Inactive,
  })
  status: Status;
}

export const AssociationSchema = SchemaFactory.createForClass(Association);
