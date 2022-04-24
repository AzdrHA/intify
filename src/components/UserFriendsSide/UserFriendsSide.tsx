import React, {useEffect} from 'react';
import {makeRequest} from '@app/api/makeRequest';
import {ApiConfig} from '@app/config/apiConfig';

export const UserFriendsSide = () => {
  useEffect(() => {
    makeRequest(ApiConfig.users.privateMessage, 'GET').then((r) => console.log(r));
  }, []);

  return (
    <div>
      cococo
    </div>
  );
};
