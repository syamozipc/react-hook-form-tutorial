import { useEffect } from 'react';
import './App.css';
import Headers from './Header';
import { useForm } from 'react-hook-form';
import { getValue } from '@testing-library/user-event/dist/utils';

let renderCount = 0;

export default function App() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
    formState: { isDirty },
    // formの状態を確認可能
  } = useForm({
    // 初期表示
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  renderCount++;

  // keepDefaultValuesがtrueの場合、入力値とdefaultValuesが異なるのでtrueになる（formが変更されたか分かる）
  console.log(isDirty);

  // TODO:よく理解していない。
  // onSubmitでresetするだけだと、asyncなのでうまくいかないとのこと
  useEffect(() => {
    if (!formState.isSubmitSuccessful) return;

    reset();
  }, [formState, reset]);

  return (
    <div>
      <Headers
        renderCount={renderCount}
        description="Performant, flexible and extensible forms with easy-to-use validation."
      />
      <form
        // submit時のコールバックを登録（dataで入力値を受け取れる）
        // リロードされないのでpreventDefaultが呼ばれているっぽい
        onSubmit={handleSubmit((data) => {
          reset();
        })}
      >
        <input {...register('firstName')} placeholder="first name" />
        <input {...register('lastName')} placeholder="last name" />
        {/* resetは引数無しだとフォーム値をdefaultValuesに戻すが、引数ありだとその値にし、defaultValuesも更新する */}
        <button
          type="button"
          onClick={() =>
            // setValueと異なり、resetはformStateを一掃する
            reset(
              // { firstName: 'ryota', lastName: 'saito' },
              // lastName以外は入力値でリセット
              { ...getValues(), lastName: 'hogehoge' },
              // defaultValuesを更新しない
              { keepDefaultValues: true }
            )
          }
        >
          reset
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
