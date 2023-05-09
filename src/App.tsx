import './App.css';
import Headers from './Header';
import { useForm } from 'react-hook-form';

let renderCount = 0;

type FormValues = {
  firstName: string;
  lastName: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => console.log(data);
  renderCount++;

  console.log('errors', errors);

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
        <input
          {...register('lastName', { required: true, minLength: 4 })}
          placeholder="Last Name"
        />
        {/* button押下でform全体をvalidate */}
        {/* <button type="button" onClick={() => trigger()}>
        {/* async/awaitでvalidate結果を取得も可能 */}
        {/* <button
          type="button"
          onClick={async () => {
            console.log('output', await trigger());
          }}
        > */}
        {/* validate時に特定inputにfocusする */}
        <button
          type="button"
          onClick={() => trigger('firstName', { shouldFocus: true })}
        >
          trigger
        </button>
        {/* firstNameだけvalidate */}
        {/* <button type="button" onClick={() => trigger('firstName')}></button> */}
        {/* 配列に記載した項目だけvalidate */}
        {/* <button type="button" onClick={() => trigger(['firstName','lasttName'])}></button> */}
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
