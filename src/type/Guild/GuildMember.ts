import {Guild} from '@app/Type/Guild/Guild';

export type GuildMember = {
  id: number;
  name: string;
  guild: Guild;
}
