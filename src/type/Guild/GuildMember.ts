import {Guild} from '@app/type/Guild/Guild';

export type GuildMember = {
  id: number;
  name: string;
  guild: Guild;
}
