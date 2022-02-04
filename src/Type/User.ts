import {Image} from '@app/Type/Image';
import {UserStatus} from '@app/Type/UserStatus';
import {Guild} from '@app/Type/Guild';

export type User = {
  id: string;
  username: string;
  token: string;
  status?: UserStatus | null;
  guilds: Guild[];
  image?: Image | null;
  updateAt?: Date | null;
  createdAt?: Date | null;
}
