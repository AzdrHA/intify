export const ApiConfig = {
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
  },
  messages: (channel: string) => {
    return `/channels/${channel}/messages`;
  },
};
