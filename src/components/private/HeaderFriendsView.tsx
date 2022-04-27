import React, {} from 'react';
import {friendType} from '@components/private/FriendsView/FriendsView';

export const HeaderFriendsView = () => {
  return (
    <div className={'channel'}>
      {
        function() {
          const test = [];
          for (const filter in friendType) {
            if (friendType.hasOwnProperty(filter)) {
              test.push(
                  <button>
                    {filter}
                  </button>,
              );
            }
          }
          return test;
        }()
      }
    </div>
  );
};
