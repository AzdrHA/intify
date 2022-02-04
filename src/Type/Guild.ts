import {Image} from '@app/Type/Image';
import {Channel} from '@app/Type/Channel';

export type Guild = {
  id: string;
  // members: string;
  name: string;
  image?: Image | null;
  channels?: Channel[] | null
  updateAt: Date;
  createdAt: Date;
}
