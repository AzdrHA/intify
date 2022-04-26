import React, {FC} from 'react';
import {Message} from '@app/type/Message/Message';
import UtilsDate from '@app/utils/UtilsDate';
import {imageFormat} from '@app/utils/imageFormat';

type ChatListLayout = {
  messages: Message[];
  imageClick: Function;
}

export const ChatListLayout: FC<ChatListLayout> = (props: ChatListLayout) => {
  const imageLoad: React.ChangeEventHandler<HTMLImageElement> = (e) => {
    imageFormat(e.currentTarget);
  };

  return (
    <>
      {
        props.messages.map((message, i) => {
          const lastMessage = props.messages[i - 1];
          const createdAtLastMessage = lastMessage ? new Date(lastMessage.createdAt).getTime() : false;

          const createdAt = new Date(message.createdAt).getTime();
          const now = new Date().getTime();
          const oneDay = 8.64e+7;
          const minutesSeparation = 60 * 10000;
          const lastMsgSeparation = (createdAtLastMessage ? Boolean((createdAt - createdAtLastMessage) < minutesSeparation) : false) && lastMessage.owner.id === message.owner.id;
          const createdAtFormat = new Date(message.createdAt);


          return (
            <div
              className={lastMsgSeparation ? 'message-wrapper-container pl-5' : 'message-wrapper-container py-1 pl-5 '}
              key={i}>

              <div className={'message-author-avatar-container'}>
                {!lastMsgSeparation &&
                    <div className="avatar">
                    </div>
                }
              </div>


              <div className={'message-content-container'}>
                {
                  !lastMsgSeparation && <div className={'message-info-container'}>
                    {/* <div className={'message-info-author-name'}>AUTHOR</div>*/}
                    <div
                      // @ts-ignore
                      className={'message-info-author-name'}>{message.owner.guildMembers && message.owner.guildMembers[0].name}</div>
                    <div className="message-info-time">
                      <small>
                        {
                                (now - createdAt) < oneDay ? <>Today
                                  at {UtilsDate.dateTransform([createdAtFormat.getHours(), createdAtFormat.getMinutes(), createdAtFormat.getSeconds()], ':')}</> : (now - createdAt) > oneDay && (now - createdAt) < (oneDay * 2) ? <>Yesterday
                                  at {UtilsDate.dateTransform([createdAtFormat.getHours(), createdAtFormat.getMinutes(), createdAtFormat.getSeconds()], ':')}</> : <>{message.createdAt}</>
                        }
                      </small>
                    </div>
                  </div>
                }
                <div className="message-wrapper-content">
                  <div dangerouslySetInnerHTML={{__html: message.content}}
                    className={lastMsgSeparation ? 'message-content' : 'message-content mt-0.5'}/>
                </div>
                <div>
                  {
                    message.messageAttachments.length ? <div>
                      <div>
                        {
                          message.messageAttachments.map((messageAttachment, i) => {
                            return (
                              <div onClick={() => props.imageClick(`http://localhost:86/media/${messageAttachment.path}`)} data-path={`http://localhost:86/media/${messageAttachment.path}`} data-name={messageAttachment.clientName} className={'message-attachment-image-container'} key={i}>
                                <img onLoad={imageLoad} src={`http://localhost:86/media/${messageAttachment.path}`} alt={messageAttachment.clientName}/>
                              </div>
                            );
                          })
                        }
                      </div>
                    </div> : null
                  }
                </div>
              </div>
            </div>
          );
        })
      }
    </>
  );
};
