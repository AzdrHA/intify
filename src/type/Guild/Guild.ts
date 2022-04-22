import {Image} from '@app/Type/Image';
import {Channel} from '@app/Type/Channel/Channel';

export type Guild = {
  id: string;
  // members: string;
  name: string;
  image?: Image | null;
  channels: Channel[] | []
  updateAt: Date;
  createdAt: Date;
}
