import {User} from '@app/type/User/User';

export type Message = {
  id: number;
  content: string;
  createdAt: Date;
  updateAt: Date;
  owner: User;
}
