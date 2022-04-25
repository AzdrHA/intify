import {GuildMember} from '@app/type/Guild/GuildMember';
import {LegacyRef} from 'react';

export interface ServerButtonProps extends Partial<GuildMember> {
  type: 'HOME' | 'SERVER' | 'ADD';
  ref: LegacyRef<HTMLDivElement>;
  onClick: (index: number) => void;
  index: number;
}
