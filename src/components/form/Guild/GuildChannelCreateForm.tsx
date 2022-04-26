import {Field, Form} from 'react-final-form';
import React, {FC} from 'react';
import {GuildChannelCreateRequest} from '@app/type/Api/GuildRequest';
import {Input} from '@components/style/input/Input';
import {required} from '@components/form/FormValidation';
import {InputSelect} from '@components/style/input/InputSelect';
import {ChannelType} from '@app/type/Channel/ChannelType';
import {guildChannelCreateRequest} from '@app/api/guildChannelRequest';
import {useParams} from 'react-router';
import {GuildRouter} from '@app/type/Router/GuildRouter';

export type GuildChannelCreateFormProps = {
  toggleModal: Function
  parent?: string | null;
}
export const GuildChannelCreateForm: FC<GuildChannelCreateFormProps> = (props: GuildChannelCreateFormProps) => {
  const urlParams = useParams<GuildRouter>();
  const submitForm = (data: GuildChannelCreateRequest) => {
    guildChannelCreateRequest(urlParams.guild as string, Object.assign(data, {parent: props.parent})).then(() => {
      props.toggleModal();
    });
  };

  return (
    <Form
      onSubmit={submitForm}
      validate={() => {
        const errors: Partial<GuildChannelCreateRequest> = {};
        return errors;
      }}
      render={({handleSubmit}) => (
        <div className={'shadow form-base-container'}>
          <div className={'form-create-server-title-container p-3 pb-0'}>
            <h1 className={'form-create-server-title'}>Create Text Channel</h1>
            <p className={'form-create-server-subtitle'}>in Text Channels</p>
          </div>
          <div className={'py-3'}/>
          <form onSubmit={handleSubmit} autoComplete={'off'}>
            <div className={'px-3'}>
              <Field validate={required} name={'type'} render={({input, meta}) => (
                <InputSelect required={true} id={'type'} input={input} meta={meta} label={'channel name'}>
                  <option value={ChannelType.GUILD_TEXT}>Text Channel</option>
                  <option value={ChannelType.GUILD_VOICE}>Voice Channel</option>
                </InputSelect>
              )}/>
            </div>
            <div className={'py-1'}/>
            <div className={'px-3'}>
              <Field validate={required} name={'name'} render={({input, meta}) => (
                <Input required={true} id={'name'} input={input} meta={meta} label={'channel name'} placeholder={'new-channel'}/>
              )}/>
            </div>
            <div className={'py-3'}/>
            <div className={'flex justify-end bg-pink-500 py-3 px-3 form-base-bottom text-tiny'}>
              <button onClick={() => props.toggleModal()} type="button">Cancel</button>
              <button className={'rounded bg-primary py-2 px-3 ml-5'} type="submit">Create</button>
            </div>
          </form>
        </div>
      )}
    />
  );
};
