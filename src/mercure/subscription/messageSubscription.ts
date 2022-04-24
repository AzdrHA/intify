import {MercureSubscriptionEvent} from '@app/mercure/subscription/mercureSubscriptionEvent';
import {generatePath} from 'react-router';
import {mercureConfig} from '@app/mercure/MercureConfig';

export const createMessageSubscription = (id: string, callback: ((this: EventSource, ev: MessageEvent<any>) => any) | null) => {
  return MercureSubscriptionEvent.createEvent(generatePath(mercureConfig.routes.channels.create_message, {id}), callback);
};

export const startTypingMessageSubscription = (id: string, callback: ((this: EventSource, ev: MessageEvent<any>) => any) | null) => {
  return MercureSubscriptionEvent.createEvent(generatePath(mercureConfig.routes.channels.start_typing, {id}), callback);
};


export const stopTypingMessageSubscription = (id: string, callback: ((this: EventSource, ev: MessageEvent<any>) => any) | null) => {
  return MercureSubscriptionEvent.createEvent(generatePath(mercureConfig.routes.channels.stop_typing, {id}), callback);
};
