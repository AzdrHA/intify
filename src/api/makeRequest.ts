import axios, {Method} from 'axios';
import Cookies from 'js-cookie';

export const makeRequest = (url: string, method: Method, data: any = {}, withAuth: boolean = true, isFile = false): Promise<any> => {
  const headers = {
    'authorization': `Bearer ${Cookies.get('token')}`,
    'Content-Type': isFile ? 'multipart/form-data' : 'application/json',
    'Accept': 'application/json',
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
