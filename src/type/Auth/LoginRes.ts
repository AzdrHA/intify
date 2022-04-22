import {User} from '@app/Type/User/User';

export interface LoginRes extends User {
  token: string;
}
