import {makeRequest} from '@app/api/makeRequest';
import {ApiConfig} from '@app/config/apiConfig';
import {GuildCreateRequest} from '@app/type/Api/GuildRequest';
import {Guild} from '@app/type/Guild/Guild';

/**
 * @param {GuildCreateRequest} data
 * @return {Promise<Guild>}
 */
export const guildCreateRequest = (data: GuildCreateRequest): Promise<Guild> => {
  return makeRequest(ApiConfig.guilds.create, 'POST', data);
};
