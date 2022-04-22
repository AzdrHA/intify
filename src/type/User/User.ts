import {Image} from '@app/Type/Image';
import {UserStatus} from '@app/Type/User/UserStatus';
import {GuildMember} from '@app/Type/Guild/GuildMember';

export type User = {
  id: string;
  username: string;
  token: string;
  status?: UserStatus | null;
  members?: GuildMember[] | [];
  image?: Image | null;
  updateAt?: Date | null;
  createdAt?: Date | null;
}
