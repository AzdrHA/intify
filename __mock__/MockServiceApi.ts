import {faker} from '@faker-js/faker';
import {Channel, ChannelType} from '@app/type/Channel/Channel';
import {User} from '@app/type/User/User';
import {Guild} from '@app/type/Guild/Guild';

/**
 * @param {number} min default 600
 * @param {number} max default 1680
 * @return {number}
 */
const rdPing = (min: number = 600, max: number = 1680) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * @param {object} result
 * @return {Promise<any>}
 */
const promise = (result: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if ((Math.random() * 100 < (100 / 6))) {
        return reject(result);
      }
      return resolve(result);
    }, rdPing());
  });
};

export const mockGuildData = () => {
  faker.name.findName();
};

export const mockChannel = (): Promise<Channel[]> => {
  const channels: Channel[] = [];
  for (let i = 1; i < 90; i++) {
    channels.push({
      position: 0,
      topic: 'text',
      type: ChannelType.GUILD_TEXT,
      id: i.toString(),
      name: faker.company.bs(),
      createdAt: new Date(),
      updateAt: new Date(),
    });
  }
  return promise(channels);
};

export const mockAccount = (): Promise<User> => {
  const guilds: Guild[] = [];
  for (let i = 1; i < 5; i++) {
    guilds.push({
      id: i.toString(),
      name: faker.company.bs(),
      channels: [],
      image: null,
      createdAt: new Date(),
      updateAt: new Date(),
    });
  }
  return promise({
    id: '456456468465156186',
    username: 'Azdra',
    token: 'gGhgd454Ggdeisbb478fghgd13297Ypbf91f',
    status: null,
    guilds: guilds,
    image: null,
    createdAt: new Date(),
    updateAt: new Date(),
  } as User);
};

