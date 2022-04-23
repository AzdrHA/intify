import React, {FC} from 'react';
import {DivContentEditableProps} from '@app/type/Props/style/input/DivContentEditableProps';

export const DivContentEditable: FC<DivContentEditableProps> = (props: DivContentEditableProps) => {
  return (
    <div
      data-placeholder={props.placeholder}
      className={'input-message'}
      onKeyDown={props.onKeyDown}
      autoCorrect={'off'}
      spellCheck={true}
      role={'textbox'}
      contentEditable={true}
    />
  );
};
