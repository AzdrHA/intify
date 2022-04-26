import {MercureSubscriptionEvent} from '@app/mercure/subscription/mercureSubscriptionEvent';
import {generatePath} from 'react-router';
import {mercureConfig} from '@app/mercure/MercureConfig';
import {Channel} from '@app/type/Channel/Channel';

export const createGuildChannelSubscription = (guildID: string, callback: (guild: Channel[]) => any) => {
  return MercureSubscriptionEvent.createEvent(generatePath(mercureConfig.routes.guilds.channel.create_channel, {guild: guildID}), (e) => {
    callback(JSON.parse(e.data));
  });
};
