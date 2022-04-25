import {UserStatus} from '@app/type/User/UserStatus';
import {GuildMember} from '@app/type/Guild/GuildMember';
import {Image} from '@app/type/Image';

export type User = {
  id: string;
  username: string;
  email: string;
  token: string;
  status?: UserStatus | null;
  members?: GuildMember[] | undefined;
  image?: Image | null;
  updateAt?: Date | null;
  createdAt?: Date | null;
  password: string;
}
