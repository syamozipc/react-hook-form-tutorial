import './App.css';
import Headers from './Header';
import { useForm } from 'react-hook-form';
import * as React from 'react';

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
      test: 'test',
      test1: { data: '' },
      test2: [''],
      age: undefined,
    },
  });
  renderCount++;
  // バリデーションエラーが格納されている（バリデーションの種類, 設定したエラーメッセージ, DOM要素）
  console.log(errors);

  // JSXの外でもregister可能
  // register("test", { required: "This is required" });
  // より細かく設定
  register('test', { required: { value: true, message: 'This is required' } });
  // ドットでobjectをネスト可能
  register('test1.data');
  // ドット + 数字で配列を表現可能
  register('test2.0');

  // firstName入力の都度、値を取得している（引数を省略するとform全体を監視）
  // const firstName = watch('firstName');
  // 第二引数はデフォルト値が可能
  // console.log(watch('firstName', 'ryota'));
  // 配列も可能
  // const firstName = watch(['firstName', 'lastName']);

  // 入力する度に発火する（再レンダリングは走っていない）
  // useStateに値を持たせてonChangeでsetしていると再レンダリングしまくるので、そうならないのは良さそう
  React.useEffect(() => {
    const subscription = watch((data) => console.log(data));

    return () => subscription.unsubscribe();
    // 依存先にwaitのreturn（ここではfirstName）を持たせると常に発火する挙動になってしまう？
  }, [watch]);

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
        {/* <p>{firstName}</p> */}
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
        {/* 標準ではtypeがnumberでも文字列型だが、number型に変換してくれる */}
        <input type="number" {...register('age', { valueAsNumber: true })} />
        <input type="submit" />
      </form>
    </div>
  );
}
