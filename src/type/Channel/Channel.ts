import {ChannelType} from '@app/type/Channel/ChannelType';

export type Channel = {
  id: string;
  name: string;
  type: ChannelType;
  topic: string;
  position: number;
  updateAt: Date;
  createdAt: Date;
  parent?: Channel;
}
