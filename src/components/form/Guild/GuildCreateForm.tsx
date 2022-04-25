import {Field, Form} from 'react-final-form';
import React, {FC, MouseEventHandler} from 'react';
import {guildCreateRequest} from '@app/api/guildRequest';
import {GuildCreateRequest} from '@app/type/Api/GuildRequest';
import {useAppSelector} from '@app/reducers/hook';
import {Input} from '@components/style/input/Input';
import {useDispatch} from 'react-redux';
import {guildMember} from '@components/slice/GuildMemberSlice';

type GuildCreateFormProps = {
  toggleModal: MouseEventHandler<HTMLButtonElement>
}
export const GuildCreateForm: FC<GuildCreateFormProps> = (props: GuildCreateFormProps) => {
  const userInfo = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const submitForm = (data: GuildCreateRequest) => {
    guildCreateRequest(data).then((user) => {
      // TODO REMOVE DISPATCH
      // @ts-ignore
      dispatch(guildMember.actions.setDefault(user.members));
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
            <h1 className={'form-create-server-title'}>Create a server</h1>
            <p className={'form-create-server-subtitle'}>Your server i where you and your friends hang out. Make yours and start talking.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={'p-3'}>
              <Field validate={required} initialValue={userInfo.username+'\'s server'} name={'name'} render={({input, meta}) => (
                <Input required={true} id={'name'} input={input} meta={meta} label={'Server name'}/>
              )}/>
            </div>

            <div className={'flex justify-end bg-pink-500 py-3 px-3 form-base-bottom text-tiny'}>
              <button onClick={props.toggleModal} type="button">Cancel</button>
              <button className={'rounded bg-primary py-2 px-3 ml-5'} type="submit">Create</button>
            </div>
          </form>
        </div>
      )}
    />
  );
};
