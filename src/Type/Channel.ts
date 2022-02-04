import {ChannelType} from '@app/Type/ChannelType';

export type Channel = {
  id: string;
  name: string;
  type: ChannelType;
  topic: string;
  updateAt: Date;
  createdAt: Date;
}
