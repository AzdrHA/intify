import React, {FC} from 'react';
import {ServerButton} from '@components/ServerButton/ServerButton';
import {GuildMember} from '@app/Type/Guild/GuildMember';
import {Divider} from '@components/style/divider';

type ServerSideProps = {
  guildMembers: GuildMember[] | undefined
}

export const ServerSide: FC<ServerSideProps> = (props: ServerSideProps) => {
  return (
    <div className="bg-dark-100 section-server-container">
      <div className="py-1.5">
        <ServerButton name={'Home'} type={'HOME'}/>

        {
          props.guildMembers ? <Divider/> : null
        }

        {
          props.guildMembers && props.guildMembers.map((guild, i) => {
            return (
              <ServerButton {...guild} type={'SERVER'} key={i}/>
            );
          })
        }

        <Divider/>

        <ServerButton name={'Add server'} type={'ADD'}/>
      </div>
    </div>
  );
};
