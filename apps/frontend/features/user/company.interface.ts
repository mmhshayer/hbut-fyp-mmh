import { Status } from '../../shared';
import { User } from './user.interface';

export default interface Company {
  _id: string;
  name: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  users: User[];
}
