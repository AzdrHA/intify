import {User} from '@app/type/User/User';

export type UserLoginRequest = Pick<User, 'email'|'password'>
