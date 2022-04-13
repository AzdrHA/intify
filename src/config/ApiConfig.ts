export const ApiConfig = {
  auth: {
    login: '/auth/login',
  },
  users: {
    account: '/users/account',
  },
  guilds: {
    get: (guildId: string) => {
      return `/guilds/${guildId}`;
    },
  },
};
