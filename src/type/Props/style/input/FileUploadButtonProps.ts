import {ChangeEventHandler} from 'react';

export type FileUploadButtonProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  accept: string;
}
