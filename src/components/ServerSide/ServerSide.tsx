import React, {FC} from 'react';
import {ServerButton} from '@components/ServerButton/ServerButton';
import {Guild} from '@app/Type/Guild';

type ServerSideProps = {
  guilds: Guild[]
}

export const ServerSide: FC<ServerSideProps> = (props: ServerSideProps) => {
  return (
    <div className="w-14 h-full bg-dark">
      <div className="py">
        <ServerButton/>

        {
          props.guilds.length ? <div>divider</div> : null
        }

        {
          props.guilds.map((guild, i) => {
            return (
              <ServerButton key={i}/>
            );
          })
        }

        <div>divider</div>

        <ServerButton/>
      </div>
    </div>
  );
};
