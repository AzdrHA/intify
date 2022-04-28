import {User} from '@app/type/User/User';
import {MessageAttachment} from '@app/type/Message/MessageAttachment';

export type Message = {
  id: number;
  content: string;
  createdAt: Date;
  updateAt: Date;
  owner: User;
  messageAttachments: MessageAttachment[] | null
}
