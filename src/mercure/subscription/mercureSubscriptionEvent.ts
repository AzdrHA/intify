export abstract class MercureSubscriptionEvent {
  private static mercure_url: string = 'http://127.0.0.1:1080/.well-known/mercure';

  public static createEvent = (topic: string, callback: ((this: EventSource, ev: MessageEvent<any>) => any) | null) => {
    const url = new URL(this.mercure_url);
    url.searchParams.append('topic', topic);

    const es = new EventSource(url);
    es.onmessage = callback;
  };
}
