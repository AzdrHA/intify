export abstract class MercureSubscriptionEvent {
  private static mercure_url: string = 'http://127.0.0.1:1080/.well-known/mercure';
  public static create_message = 'channels/%s/messages';

  private static createEvent = (topic: string) => {
    const url = new URL(this.mercure_url);
    url.searchParams.append('topic', topic);

    return new EventSource(url);
  };

  public static listen = (topic: string): any => {
    return new Promise((resolve, reject) => {
      return this.createEvent(topic).onmessage = (messageEvent) => {
        return resolve(JSON.parse(messageEvent.data));
      };
    });
  };

  /*

  eventSource.onopen = function(e) {
    console.log('eventSource.onopen');
  };*/
}
