import './App.css';
import Headers from './Header';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import { useEffect } from 'react';

let renderCount = 0;

type FormValues = {
  firstName: string;
  check: boolean;
};

export default function App() {
  const { register, handleSubmit, watch, unregister } = useForm<FormValues>({
    defaultValues: { firstName: 'ryota', check: true },
    // unmountされた際に値を初期化するオプション（再mount時は空文字 → default value反映の流れ？）
    // defaultのfalseだとfirstNameが初期化されず、checkboxを2回クリックしてinputのunmount → remountとしてもfirstNameの入力値が反映される
    // shouldUnregister: true,
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
  renderCount++;

  const checkbox = watch('check');
  console.log(checkbox);

  useEffect(() => {
    // checkboxがfalseになったらfirstNameを初期化（空文字）にする
    if (!checkbox) return unregister('firstName');
    // 配列で指定も可能
    // if (!checkbox) return unregister(['firstName']);
  }, [unregister, checkbox]);

  return (
    <div>
      <Headers
        renderCount={renderCount}
        description="Performant, flexible and extensible forms with easy-to-use validation."
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {checkbox && (
          // unregisterしていても、このinputがunmountされていないと再度registerが呼ばれてしまうので注意
          <input
            {...register('firstName', { required: true, minLength: 4 })}
            placeholder="First Name"
          />
        )}
        <input type="checkbox" {...register('check')} />
        <input type="submit" />
      </form>
    </div>
  );
}
