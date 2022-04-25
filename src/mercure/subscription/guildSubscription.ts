import {MercureCallback} from '@app/type/MercureCallback';
import {MercureSubscriptionEvent} from '@app/mercure/subscription/mercureSubscriptionEvent';
import {generatePath} from 'react-router';
import {mercureConfig} from '@app/mercure/MercureConfig';

export const createGuildSubscription = (user: string, callback: MercureCallback) => {
  return MercureSubscriptionEvent.createEvent(generatePath(mercureConfig.routes.guilds.create_guild, {user}), callback);
};
