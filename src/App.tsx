import './App.css';
import Headers from './Header';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';

let renderCount = 0;

type FormValues = {
  firstName: string;
};

export default function App() {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
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
        <input type="submit" />
      </form>
    </div>
  );
}
