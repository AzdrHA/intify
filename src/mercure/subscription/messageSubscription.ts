import {MercureSubscriptionEvent} from '@app/mercure/subscription/mercureSubscriptionEvent';
import {generatePath} from 'react-router';
import {mercureConfig} from '@app/mercure/MercureConfig';
import {MercureCallback} from '@app/type/MercureCallback';

export const createMessageSubscription = (id: string, callback: MercureCallback) => {
  return MercureSubscriptionEvent.createEvent(generatePath(mercureConfig.routes.channels.create_message, {id}), callback);
};

export const startTypingMessageSubscription = (id: string, callback: MercureCallback) => {
  return MercureSubscriptionEvent.createEvent(generatePath(mercureConfig.routes.channels.start_typing, {id}), callback);
};

export const stopTypingMessageSubscription = (id: string, callback: MercureCallback) => {
  return MercureSubscriptionEvent.createEvent(generatePath(mercureConfig.routes.channels.stop_typing, {id}), callback);
};
