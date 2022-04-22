export const ApiConfig = {
  auth: {
    login: '/auth/login',
  },
  users: {
    account: '/users/account',
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
