import React, {FC, useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router';
import {GuildRouter} from '@app/type/Router/GuildRouter';
import {ChannelSideProps} from '@app/type/Props/ChannelSideProps';
import GuildChannelButton from '@components/style/button/GuildChannelButton';
import {createGuildChannelSubscription} from '@app/mercure/subscription/Guild/guildChannelSubscription';
import {Channel} from '@app/type/Channel/Channel';

export const ChannelsListLayout: FC<ChannelSideProps> = (props: ChannelSideProps) => {
  const urlParams = useParams<GuildRouter>();
  const channelsRef = useRef<HTMLDivElement[]>([]);
  const [channels, setChannels] = useState<Channel[]>(props.channels);

  useEffect(() => {
    if (urlParams.guild) {
      createGuildChannelSubscription(urlParams.guild, (e) => {
        setChannels(e);
      });
    }
  }, []);

  useEffect(() => {
    const currentChannel = channels.find((channel) => channel.id == String(urlParams.channel));
    if (currentChannel) {
      channelClick(channels.indexOf(currentChannel));
    }
  }, [channels, urlParams.channel]);

  const channelClick = (index: number) => {
    channelsRef.current.map((div) => {
      if (div.classList.contains('selected')) {
        div.classList.remove('selected');
      }
    });
    channelsRef.current[index].classList.add('selected');
  };

  return (
    <>
      {
        channels.map((channel, i) => {
          return <GuildChannelButton
            key={i}
            index={i}
            channel={channel}
            ref={(ref) => channelsRef.current[i] = ref as HTMLDivElement}
          />;
        })
      }
    </>
  );
};
