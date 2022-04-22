import {HashTagIcon} from '@components/style/Icons/HashTagIcon';
import {UtilsStr} from '@app/utils/UtilsStr';
import React, {FC} from 'react';
import {Channel} from '@app/Type/Channel/Channel';

type ChatDefaultMessageProps = {
  channel?: Channel|null
}


export const ChatDefaultMessage: FC<ChatDefaultMessageProps> = (props: ChatDefaultMessageProps) => {
  return (
    <>
      <div className={'section-chat-channel-info-icon'}>
        <HashTagIcon/>
      </div>
      <div className="section-chat-channel-info-content">
        <div className={'section-chat-channel-info-title'}>
          Welcome to <span className={'channel-name'}>#{UtilsStr.formatToChannelName(props.channel?.name)}</span>
        </div>
        <div className={'section-chat-channel-info-subtitle'}>
          This is the start of the <span className={'channel-name'}>#{UtilsStr.formatToChannelName(props.channel?.name)}</span> channel.
        </div>
      </div>

      <div className="divider-message"/>
    </>
  );
};
