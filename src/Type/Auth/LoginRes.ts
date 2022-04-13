import {User} from '@app/Type/User';

export interface LoginRes extends User {
  token: string;
}
