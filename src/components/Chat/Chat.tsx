import React, {FC, useEffect, useRef, useState} from 'react';
import {HeaderGuildChat} from '@components/Guild/HeaderGuildChat/HeaderGuildChat';
import {useParams} from 'react-router';
import {Guild} from '@app/Type/Guild/Guild';
import {Channel} from '@app/Type/Channel/Channel';
import {ChatDefaultMessage} from '@components/Chat/ChatDefaultMessage';
import {UtilsStr} from '@app/utils/UtilsStr';
import {makeRequest} from '@app/api/makeRequest';
import {ApiConfig} from '@app/config/apiConfig';

type ChatProps = {
  guild: Guild
}

export const Chat: FC<ChatProps> = (props: ChatProps) => {
  const urlParams = useParams();
  const [currentChannel, setCurrentChannel] = useState<Channel>();
  const [messages, setMessages] = useState([]);
  const fileUpload = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentChannel(props.guild.channels.find((channel) => channel.id == String(urlParams.channel)));

    if (!currentChannel) return;
    makeRequest(ApiConfig.messages(currentChannel.id), 'GET').then((r) => setMessages(r));
  }, [currentChannel]);

  const sendMessage = (message: string) => {
    if (!currentChannel) return;
    console.log(message);
    makeRequest(ApiConfig.messages(currentChannel.id), 'POST', {
      content: message,
    }).then((r) => {
      console.log(r);
    });
  };

  const keyDown: React.KeyboardEventHandler<HTMLDivElement> = async (e) => {
    const value = e.currentTarget.innerText.trimStart().trim();
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.length === 0) return;
      sendMessage(value);
      e.currentTarget.innerHTML = '';
    }
  };

  return (
    <>
      <div className="chat-header-container overflow-hidden h-12 text-white">
        <HeaderGuildChat channel={currentChannel}/>
      </div>
      <div className={'section-chat-messages text-white'}>
        <div className={'section-chat-channel-info-container'}>
          <ChatDefaultMessage channel={currentChannel}/>
          <>
            {
              messages.map((message, i) => {
                return (
                  <div key={i}>
                    {message.content}
                  </div>
                );
              })
            }
          </>
        </div>
      </div>
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
