import './App.css';
import Headers from './Header';
import { useForm } from 'react-hook-form';
import * as React from 'react';

let renderCount = 0;

export default function App() {
  const {
    register,
    handleSubmit,
    setValue,
    // formの状態を確認可能
    formState: { isDirty, dirtyFields, touchedFields, isValid, errors },
  } = useForm({
    // いつvalidationを実行するか
    mode: 'onChange',
    // 初期表示
    defaultValues: {
      yourDetails: {
        firstName: '',
        lastName: '',
      },
    },
  });
  renderCount++;

  console.log('dirty fields', isDirty, dirtyFields);
  console.log('touched fields', touchedFields);
  console.log('is valid', isValid);
  console.log('errors', errors);

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
          console.log(data);
        })}
      >
        {/* バリデーション通らないとsubmitされない */}
        <input
          // required: trueだけでもOK（エラーメッセージは空文字になる）
          // {...register("firstName", { required: true })}
          {...register('yourDetails.firstName', {
            required: 'This is required',
            minLength: 3,
          })}
          placeholder="First Name"
        />
        <input
          // required: trueだけでもOK（エラーメッセージは空文字になる）
          // {...register("firstName", { required: true })}
          {...register('yourDetails.lastName', {
            required: 'This is required',
            minLength: 3,
          })}
          placeholder="Last Name"
        />
        {/* クリックしたらfirstNameにryotaが入る */}
        <button
          type="button"
          onClick={
            () =>
              setValue(
                'yourDetails',
                { firstName: 'ryota', lastName: 'saito' },
                {
                  shouldDirty: true,
                  // 再レンダリングが走る
                  shouldTouch: true,
                  shouldValidate: true,
                }
              )
            // このように書くこともできる
            // setValue('yourDetails.firstName','ryota')
          }
        >
          set value
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
