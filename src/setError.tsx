import './App.css';
import Headers from './Header';
import { useForm } from 'react-hook-form';

let renderCount = 0;

type FormValues = {
  firstName: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
    },
    // 複数エラーに対応
    criteriaMode: 'all',
  });
  const onSubmit = (data: FormValues) => console.log(data);
  renderCount++;

  return (
    <div>
      <Headers
        renderCount={renderCount}
        description="Performant, flexible and extensible forms with easy-to-use validation."
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('firstName', { required: true, minLength: 4 })}
          placeholder="First Name"
        />
        <button
          type="button"
          onClick={() =>
            // エラーを1つ登録する例
            // setError('firstName', {
            //   type: 'custom',
            //   message: 'something is wrong',
            // })
            // エラーを複数登録する例
            setError(
              'firstName',
              {
                types: {
                  test1: 'test1 is wrong',
                  test2: 'unexpected test2 error',
                },
              },
              // firstNameのinputにfocusするオプション
              { shouldFocus: true }
            )
          }
        >
          set error
        </button>
        {/* errorが一つのケース */}
        {/* <p>{errors.firstName?.message}</p> */}
        {/* typesで複数エラーを登録した場合 */}
        <p>{errors.firstName?.types?.test1}</p>
        <p>{errors.firstName?.types?.test2}</p>
        <input type="submit" />
      </form>
    </div>
  );
}
