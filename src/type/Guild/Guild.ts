import {Image} from '@app/type/Image';
import {Channel} from '@app/type/Channel/Channel';

export type Guild = {
  id: string;
  name: string;
  image?: Image | null;
  channels: Channel[]
  updateAt: Date;
  createdAt: Date;
}
