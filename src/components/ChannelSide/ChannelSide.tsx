import React, {useEffect, useState} from 'react';
import {mockChannel} from '../../../__mock__/MockServiceApi';
import {Channel} from '@app/Type/Channel';

export const ChannelSide = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  useEffect(() => {
    mockChannel().then((r) => {
      setChannels(r);
      console.log(r);
    });
  }, []);

  return (
    <div className={'bg-primary'}>
      {
        channels.map((channel, i) => {
          return <div key={i}>
            <h1>{channel.name}</h1>
          </div>;
        })
      }
      channel
    </div>
  );
};
