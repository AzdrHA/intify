import {GuildCreateRequest} from '@app/type/Api/GuildRequest';
import {makeRequest} from '@app/api/makeRequest';
import {ApiConfig} from '@app/config/apiConfig';
import {generatePath} from 'react-router';
import {Channel} from '@app/type/Channel/Channel';

/**
 * @param {string} guild
 * @param {GuildCreateRequest} data
 * @return {Promise<Channel>}
 */
export const guildChannelCreateRequest = (guild: string, data: GuildCreateRequest): Promise<Channel> => {
  return makeRequest(generatePath(ApiConfig.guilds.channel.create, {guild}), 'POST', data);
};
