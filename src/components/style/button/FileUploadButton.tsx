import {PlusIcon} from '@components/style/icon/PlusIcon';
import React, {FC, useRef} from 'react';
import {FileUploadButtonProps} from '@app/type/Props/style/input/FileUploadButtonProps';


export const FileUploadButton: FC<FileUploadButtonProps> = (props: FileUploadButtonProps) => {
  const fileUpload = useRef<HTMLInputElement>(null);

  const uploadFileClick = () => {
    if (fileUpload.current) fileUpload.current.click();
  };

  return (
    <>
      <input
        hidden
        id="file"
        name="file"
        type="file"
        accept={props.accept}
        ref={fileUpload}
        onChange={props.onChange}
      />
      <button type={'button'} onClick={uploadFileClick} className="input-message-send-files">
        <PlusIcon/>
      </button>
    </>
  );
};
