import React, {FC, useEffect, useRef, useState} from 'react';
import {Channel, ChannelType} from '@app/Type/Channel';
import {UtilsStr} from '@app/utils/UtilsStr';
import {useParams} from 'react-router';
import {GuildRouter} from '@app/Type/GuildRouter';
import {HashTagIcon} from '@components/Icons/HashTagIcon';
import {SpeakerIcon} from '@components/Icons/SpeakerIcon';

type ChannelSideProps = {
  channels: Channel[]
}

export const ChannelSide: FC<ChannelSideProps> = (props: ChannelSideProps) => {
  const params = useParams<GuildRouter>();
  const channelRef = useRef<HTMLDivElement[]>([]);
  const [current, setCurrent] = useState<HTMLDivElement>();

  const clickChannel = (channel: HTMLDivElement, channelInfo: Channel) => {
    if (current === channel) return;

    if (current && current.classList.contains('selected')) {
      current.classList.remove('selected');
    }

    channel.classList.add('selected');
    setCurrent(channel);
  };

  useEffect(() => {
    console.log(params.channel);
    const currentChannel = props.channels.find((channel) => channel.id == String(params.channel));
    const channel = channelRef.current[props.channels.indexOf(currentChannel)];
    clickChannel(channel, currentChannel);
  }, []);

  return (
    <div className={'channel-section-container'}>
      <div className={'channel-section-content'}>
        {
          props.channels.map((channel, i) => {
            return <div
              className={`channel-container ${ChannelType[channel.type]}`}
              key={i}
              ref={(ref) => channelRef.current[i] = ref as HTMLDivElement}>
              <div className={`channel ${ChannelType[channel.type]}`}>
                {
                  channel.type === ChannelType.GUILD_TEXT ? <HashTagIcon/> : channel.type === ChannelType.GUILD_VOICE ? <SpeakerIcon/> : null
                }
                <div className={channel.type === ChannelType.GUILD_CATEGORY ? 'channel-name category' : 'channel-name'}>
                  {UtilsStr.formatToChannelName(channel.name)}
                </div>
              </div>
            </div>;
          })
        }
      </div>

    </div>
  );
};
