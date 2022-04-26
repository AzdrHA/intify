const has = Object.prototype.hasOwnProperty;

export abstract class UtilsStr {
  public static formatToChannelName = (name: string = ''): string => {
    return name.toLowerCase().replace(' ', '-');
  };

  public static queryStringify = (object: { [key: string]: string }, prefix: string = '') => {
    const pairs = [];
    for (const key in object) {
      if (has.call(object, key)) {
        pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(object[key]));
      }
    }
    return pairs.length ? prefix + pairs.join('&') : '';
  };
}
