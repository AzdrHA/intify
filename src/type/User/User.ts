import {UserStatus} from '@app/type/User/UserStatus';
import {GuildMember} from '@app/type/Guild/GuildMember';
import {Image} from '@app/type/Image';
import {Friend} from '@app/type/User/Friend';

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
  friends: Friend[];
}
