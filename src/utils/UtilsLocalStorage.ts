export class UtilsLocalStorage {
  private static CHANNEL_HISTORY: string = 'channel_history';

  public static getChannelHistory = () => {
    JSON.parse(localStorage.getItem(UtilsLocalStorage.CHANNEL_HISTORY) ?? '');
  };

  public static getItems = () => {
    return localStorage.getItem(UtilsLocalStorage.CHANNEL_HISTORY);
  };

  public static setItem = (guild: string, channel: string) => {
    const currentData = JSON.parse(this.getItems() ?? '{}');
    return localStorage.setItem(UtilsLocalStorage.CHANNEL_HISTORY, JSON.stringify(Object.assign(currentData, {[guild]: channel})));
  };
}
