import React, {FC, useEffect, useRef, useState} from 'react';
import {HeaderGuildChat} from '@components/Guild/HeaderGuildChat/HeaderGuildChat';
import {useParams} from 'react-router';
import {ChatDefaultMessageLayout} from '@components/layout/Chat/ChatDefaultMessageLayout';
import {UtilsStr} from '@app/utils/UtilsStr';
import {makeRequest} from '@app/api/makeRequest';
import {ApiConfig} from '@app/config/apiConfig';
import {ChatProps} from '@app/type/Props/ChatProps';
import {DivContentEditable} from '@components/style/input/DivContentEditable';
import {Message} from '@app/type/Message/Message';
import {GuildRouter} from '@app/type/Router/GuildRouter';
import {ChatListLayout} from '@components/layout/Chat/ChatListLayout';
import {MercureSubscriptionEvent} from '@app/mercure/mercureSubscriptionEvent';

export const ChatLayout: FC<ChatProps> = (props: ChatProps) => {
  const urlParams = useParams<GuildRouter>();
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const firstChannel = props.guild.channels.find((channel) => channel.id == String(urlParams.channel));

  useEffect(() => {
    if (props.guild.id !== urlParams.guild) {
      makeRequest(ApiConfig.messages(String(urlParams.channel)), 'GET').then((r) => {
        return setMessages(r);
      });
    }

    const url = new URL(`http://127.0.0.1:1080/.well-known/mercure`);
    url.searchParams.append('topic', `channels/${String(urlParams.channel)}/messages`);

    const es = new EventSource(url);
    es.onmessage = (r) => {
      setMessages((messages) => [...messages, JSON.parse(r.data)]);
    };
  }, [urlParams.channel]);

  const sendMessage = (message: string) => {
    makeRequest(ApiConfig.messages(String(urlParams.channel)), 'POST', {
      content: message,
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
    firstChannel ? <>
      <div className="chat-header-container overflow-hidden h-12 text-white">
        <HeaderGuildChat {...firstChannel}/>
      </div>
      <div className={'section-chat-messages text-white'}>
        <div className={'section-chat-channel-info-container'} ref={scrollRef}>
          <>
            <ChatDefaultMessageLayout channel={firstChannel}/>
          </>
          <>
            <ChatListLayout messages={messages}/>
          </>
        </div>
      </div>
      <div className="input-message-container">
        <div className={'input-message-content'}>
          <DivContentEditable onKeyDown={keyDown}
            placeholder={`Message #${UtilsStr.formatToChannelName(firstChannel.name)}`}/>
        </div>
      </div>
    </> : null
  );
};
