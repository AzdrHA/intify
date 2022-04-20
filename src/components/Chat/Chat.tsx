import React, {FC, useEffect, useRef, useState} from 'react';
import {HeaderGuildChat} from '@components/Guild/HeaderGuildChat/HeaderGuildChat';
import {useParams} from 'react-router';
import {Guild} from '@app/Type/Guild';
import {Channel} from '@app/Type/Channel';
import {ChatDefaultMessage} from '@components/Chat/ChatDefaultMessage';
import {PlusIcon} from '@components/Icons/PlusIcon';
import {UtilsStr} from '@app/utils/UtilsStr';

type ChatProps = {
  guild: Guild
}

export const Chat: FC<ChatProps> = (props: ChatProps) => {
  const urlParams = useParams();
  const [currentChannel, setCurrentChannel] = useState<Channel>();
  const fileUpload = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentChannel(props.guild.channels.find((channel) => channel.id == String(urlParams.channel)));
  }, []);

  const keyDown: React.KeyboardEventHandler<HTMLDivElement> = async (e) => {
    const value = e.currentTarget.innerText.trimStart().trim();
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // if (value.length === 0 && !file) return;
      // sendMessage(value);
      e.currentTarget.innerHTML = '';
    }
  };

  return (
    <>
      <div className="chat-header-container overflow-hidden h-12 text-white">
        <HeaderGuildChat channel={currentChannel}/>
      </div>
      <>
        <ChatDefaultMessage channel={currentChannel}/>
      </>
      <div className="input-message-container">
        <div className={'input-message-content'}>
          <div
            data-placeholder={`Message #${UtilsStr.formatToChannelName(currentChannel?.name)}`}
            className={'input-message'}
            onKeyDown={keyDown}
            autoCorrect={'off'}
            spellCheck={true}
            role={'textbox'}
            contentEditable={true}
          />
        </div>
      </div>
    </>
  );
};
