import React, {FC} from 'react';
import {UtilsStr} from '@app/utils/UtilsStr';
import {HashTagIcon} from '@components/style/icon/HashTagIcon';
import {Channel} from '@app/type/Channel/Channel';

export const HeaderGuildChat: FC<Channel> = (props: Channel) => {
  return (
    <div className={'channel'}>
      <HashTagIcon/> <p className={'channel-name'}>{UtilsStr.formatToChannelName(props.name)}</p>
    </div>
  );
};
