import {MercureSubscriptionEvent} from '@app/mercure/subscription/mercureSubscriptionEvent';
import {GuildMember} from '@app/type/Guild/GuildMember';
import {generatePath} from 'react-router';
import {mercureConfig} from '@app/mercure/MercureConfig';

export const createGuildSubscription = (userID: string, callback: (guild: GuildMember[]) => any) => {
  return MercureSubscriptionEvent.createEvent(generatePath(mercureConfig.routes.guilds.create_guild, {user: userID}), (e) => {
    callback(JSON.parse(e.data));
  });
};
