export const ApiConfig = {
  basePath: 'http://localhost:86/api/v1',
  auth: {
    login: '/auth/login',
  },
  users: {
    account: '/users/@me/account',
    privateMessage: '/users/@me/channels',
  },
  guilds: {
    get: (guild: string) => {
      return `/guilds/${guild}`;
    },
    create: '/guilds',
    channel: {
      create: '/guilds/:guild/channels',
    },
    invite: {
      join: '/guilds/invites/:code',
    },
  },
  messages: (channel: string) => {
    return `/channels/${channel}/messages`;
  },
};
