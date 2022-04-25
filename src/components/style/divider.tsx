import React, {FC} from 'react';

type DividerProps = {
  extraClass: string;
}
export const Divider: FC<DividerProps> = (props: DividerProps) => {
  return (
    <div className={`${props.extraClass} rounded bg-white opacity-10`}/>
  );
};
