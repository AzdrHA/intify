import {GuildMember} from '@app/type/Guild/GuildMember';

export interface ServerButtonProps extends Partial<GuildMember> {
  type: 'HOME' | 'SERVER' | 'ADD';
}
