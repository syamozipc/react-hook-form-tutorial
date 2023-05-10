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
    },
  });
  renderCount++;
  // バリデーションエラーが格納されている（バリデーションの種類, 設定したエラーメッセージ, DOM要素）
  console.log(errors);

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
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input
          {...register('firstName', { required: 'This is required' })}
          placeholder="First Name"
        />
        <p>{errors.firstName?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
}
