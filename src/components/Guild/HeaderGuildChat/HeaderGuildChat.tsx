import {Channel} from '@app/Type/Channel';
import React, {FC} from 'react';
import {UtilsStr} from '@app/utils/UtilsStr';
import {HashTagIcon} from '@components/Icons/HashTagIcon';

type HeaderGuildChatProps = {
  channel?: Channel|null
}

export const HeaderGuildChat: FC<HeaderGuildChatProps> = (props: HeaderGuildChatProps) => {
  return (
    <div className={'channel'}>
      <HashTagIcon/> <p className={'channel-name'}>{UtilsStr.formatToChannelName(props.channel?.name)}</p>
    </div>
  );
};
