import './App.css';
import Headers from './Header';
import { useForm } from 'react-hook-form';

let renderCount = 0;

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    // formの状態を確認可能
    formState: { errors },
  } = useForm({
    // 初期表示
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  renderCount++;
  // バリデーションエラーが格納されている（バリデーションの種類, 設定したエラーメッセージ, DOM要素）
  console.log(errors);

  // firstName入力の都度、値を取得している（引数を省略するとform全体を監視）
  const firstName = watch('firstName');

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
          {...register('firstName', { required: 'This is required' })}
          placeholder="First Name"
        />
        {/* 1度submitした後は、入力の度に検証されるので、 リアルタイムで値の妥当性が分かる*/}
        <p>{firstName}</p>
        <p>{errors.firstName?.message}</p>
        <input
          {...register('lastName', {
            required: 'This is required',
            // minLength: 4 でもOK
            minLength: {
              value: 4,
              message: 'Min length is 4',
            },
          })}
          placeholder="Last Name"
        />
        <p>{errors.lastName?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
}
