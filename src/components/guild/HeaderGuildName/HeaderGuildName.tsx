import React, {FC, useEffect} from 'react';
import {HeaderGuildNameProps} from '@app/type/Props/HeaderGuildNameProps';

export const HeaderGuildName: FC<HeaderGuildNameProps> = (props: HeaderGuildNameProps) => {
  return (
    <p>
      {props.name}
    </p>
  );
};
