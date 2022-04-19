import React, {FC} from 'react';

type HeaderGuildNameProps = {
  name: string
}

export const HeaderGuildName: FC<HeaderGuildNameProps> = (props: HeaderGuildNameProps) => {
  return (
    <p>
      {props.name}
    </p>
  );
};
