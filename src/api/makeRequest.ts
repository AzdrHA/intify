import axios, {Method} from 'axios';
import Cookies from 'js-cookie';

export const makeRequest = (url: string, method: Method, data: any = {}, withAuth: boolean = true): Promise<any> => {
  const headers = {
    authorization: `Bearer ${Cookies.get('token')}`,
  };

  return new Promise((resolve, reject) =>
    axios({
      baseURL: 'http://localhost:86/api/v1',
      method,
      url,
      data,
      headers: withAuth ? headers : {},
    }).then((r) => resolve(r.data)),
  );
};
