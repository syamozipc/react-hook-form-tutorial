import './App.css';
import Headers from './Header';
import { useForm } from 'react-hook-form';
import {
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form/dist/types/form';

let renderCount = 0;

type FormValues = {
  firstName: string;
};

export default function App() {
  // handleSubmitはe.preventDefault()を実行しつつ、validationをかける等、色々やってくれて便利
  const { register, handleSubmit } = useForm<FormValues>();
  // eventは第二引数
  const onSubmit: SubmitHandler<FormValues> = async (data, e) => {
    console.log('data', data);
    console.log('event', e);
    // エラーを投げる
    throw new Error('something went wrong');
  };
  // eventは第二引数
  const onError: SubmitErrorHandler<FormValues> = (error, e) => {
    console.log('error', error);
    console.log('event', e);
  };
  renderCount++;

  return (
    <div>
      <Headers
        renderCount={renderCount}
        description="Performant, flexible and extensible forms with easy-to-use validation."
      />
      {/* 通常のhandleSubmit */}
      {/* <form onSubmit={handleSubmit(onSubmit, onError)}> */}
      {/* onSubmitがasyncである場合のエラーハンドリング */}
      <form
        onSubmit={(e) =>
          handleSubmit(
            onSubmit,
            onError
          )(e).catch((err) => console.log('err', err))
        }
      >
        <input
          {...register('firstName', { required: true })}
          placeholder="First Name"
        />
        <input type="submit" />
      </form>
    </div>
  );
}
