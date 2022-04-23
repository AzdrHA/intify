import {User} from '@app/type/User/User';

export interface LoginRes extends User {
  token: string;
}
