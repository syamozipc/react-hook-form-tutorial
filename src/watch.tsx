import './App.css';
import Headers from './Header';
import { useForm } from 'react-hook-form';

let renderCount = 0;

export default function App() {
  const { register, handleSubmit, watch } = useForm({
    // 初期表示
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  renderCount++;

  // firstName入力の都度、値を取得している（引数を省略するとform全体を監視）
  const firstName = watch('firstName');
  // 第二引数はデフォルト値が可能
  // const firstName = watch('firstName', 'ryota');
  // 配列も可能
  // const firstName = watch(['firstName', 'lastName']);

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
        {/* 1度submitした後は、入力の度に検証されるので、 リアルタイムで値の妥当性が分かる*/}
        <p>{firstName}</p>
        <input type="submit" />
      </form>
    </div>
  );
}
