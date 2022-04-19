export abstract class UtilsStr {
  public static formatToChannelName = (name: string = ''): string => {
    return name.toLowerCase().replace(' ', '-');
  };
}
