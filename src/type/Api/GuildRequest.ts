import {Guild} from '@app/type/Guild/Guild';
import {Channel} from '@app/type/Channel/Channel';

export type GuildCreateRequest = Pick<Guild, 'name'>;
export type GuildChannelCreateRequest = Pick<Channel, 'name'|'type'>;
