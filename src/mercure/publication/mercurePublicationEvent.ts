import axios, {AxiosPromise} from 'axios';
import {mercureConfig} from '@app/mercure/MercureConfig';
import {UtilsStr} from '@app/utils/UtilsStr';

export abstract class MercurePublicationEvent {
  public static createEvent = (object: { topic: string; data: string }): AxiosPromise => {
    return axios({
      url: mercureConfig.path,
      data: UtilsStr.queryStringify(object),
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '+mercureConfig.token.publication,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  };
}
