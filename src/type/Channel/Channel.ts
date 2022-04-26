import {ChannelType} from '@app/type/Channel/ChannelType';
import {User} from '@app/type/User/User';

export type Channel = {
  id: string;
  name: string;
  parent?: Channel;
  children?: Channel[] | null
  position: number;
  recipients?: User[] | null
  type: ChannelType;
  topic: string;
  updateAt: Date;
  createdAt: Date;
}
