import React, {useEffect, useState} from 'react';
import {HeaderFriendsView} from '@components/private/HeaderFriendsView';
import {useAppSelector} from '@app/reducers/hook';
import {FriendStatus} from '@app/type/User/Friend';

export const friendType = {
  'online': 'online',
  [FriendStatus.ACCEPT]: 'all_friends',
  'pending': 'pending',
  'blockded': 'blocked',
};

export const FriendsView = () => {
  const friends = useAppSelector((state) => state.friends);
  const [type, setType] = useState<FriendStatus>(FriendStatus.ACCEPT);

  useEffect(() => {
  }, []);

  return (
    <>
      <div className="chat-header-container overflow-hidden h-12 text-white">
        {/* <HeaderFriendsView/>*/}
      </div>
      <div className={'section-chat-messages text-white'}>
        <div className={'pt-4 pb-1 px-4'}>
          <p className={'text-tiny'}>{friendType[type]} - {friends.length}</p>
          <div className={'friends-list-container mt-2'}>
            {
              friends.filter((f) => f.status === type).map((f, i) => {
                return (
                  <div key={i}>
                    {f.friend.username}
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </>
  );
};
