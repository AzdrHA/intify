export type Channel = {
  id: string;
  name: string;
  type: ChannelType;
  topic: string;
  position: number;
  updateAt: Date;
  createdAt: Date;
  parent?: Channel;
}

export enum ChannelType {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
}
