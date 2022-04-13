import {Image} from '@app/Type/Image';
import {UserStatus} from '@app/Type/UserStatus';
import {Member} from '@app/Type/Member';

export type User = {
  id: string;
  username: string;
  token: string;
  status?: UserStatus | null;
  members?: Member[] | [];
  image?: Image | null;
  updateAt?: Date | null;
  createdAt?: Date | null;
}
