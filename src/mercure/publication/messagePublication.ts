import {generatePath} from 'react-router';
import {mercureConfig} from '@app/mercure/MercureConfig';
import {MercurePublicationEvent} from '@app/mercure/publication/mercurePublicationEvent';
import {AxiosPromise} from 'axios';

export const startTypingMessagePublication = (id: string, data: object): AxiosPromise => {
  return MercurePublicationEvent.createEvent({
    topic: generatePath(mercureConfig.routes.channels.start_typing, {id}),
    data: JSON.stringify(data),
  });
};

export const stopTypingMessagePublication = (id: string, data: object): AxiosPromise => {
  return MercurePublicationEvent.createEvent({
    topic: generatePath(mercureConfig.routes.channels.stop_typing, {id}),
    data: JSON.stringify(data),
  });
};
