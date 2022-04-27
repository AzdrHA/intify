import {Guild} from '@app/type/Guild/Guild';
import {makeRequest} from '@app/api/makeRequest';
import {ApiConfig} from '@app/config/apiConfig';
import {generatePath} from 'react-router';

export const guildInviteRequest = (code: string): Promise<Guild> => {
  return makeRequest(generatePath(ApiConfig.guilds.invite.join, {code}), 'POST');
};
