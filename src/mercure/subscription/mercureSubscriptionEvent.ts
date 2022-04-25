import {MercureCallback} from '@app/type/MercureCallback';

export abstract class MercureSubscriptionEvent {
  private static mercure_url: string = 'http://127.0.0.1:1080/.well-known/mercure';

  public static createEvent = (topic: string, callback: MercureCallback) => {
    const url = new URL(this.mercure_url);
    url.searchParams.append('topic', topic);

    const es = new EventSource(url);
    es.onmessage = callback;
  };
}
