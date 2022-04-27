import {Field, Form} from 'react-final-form';
import React, {FC} from 'react';
import {GuildCreateRequest} from '@app/type/Api/GuildRequest';
import {Input} from '@components/style/input/Input';
import {guildInviteRequest} from '@app/api/guildInviteRequest';

type GuildCreateFormProps = {
  toggleModal: Function
  visibleJoinForm: Function
}
export const GuildInviteJoinForm: FC<GuildCreateFormProps> = (props: GuildCreateFormProps) => {
  const submitForm = (data: { code: string }) => {
    guildInviteRequest(data.code).then((r) => {
      props.toggleModal();
    });
  };

  const required = (value: string) => (value ? undefined : 'Required');
  return (
    <Form
      onSubmit={submitForm}
      validate={() => {
        const errors: Partial<GuildCreateRequest> = {};
        return errors;
      }}
      render={({handleSubmit})=> (
        <div className={'shadow form-base-container'}>
          <div className={'form-create-server-title-container p-3 pb-0'}>
            <h1 className={'form-create-server-title'}>Join a Server</h1>
            <p className={'form-create-server-subtitle'}>Enter an invite below to join an existing server.</p>
          </div>

          <form onSubmit={handleSubmit} autoComplete={'off'}>
            <div className={'p-3'}>
              <Field validate={required} name={'code'} render={({input, meta}) => (
                <Input required={true} id={'code'} input={input} meta={meta} label={'invite link'} placeholder={'57D4ff88PFbaq5'}/>
              )}/>
            </div>

            <div className={'flex justify-end bg-pink-500 py-3 px-3 form-base-bottom text-tiny'}>
              <button className={'rounded py-1'} onClick={() => props.visibleJoinForm(false)} type="button">Back</button>
              <button className={'rounded bg-primary py-1 px-3 ml-5'} type="submit">Join Server</button>
            </div>
          </form>
        </div>
      )}
    />
  );
};
