import { useEffect, useState } from 'react';
import './App.css';
import Headers from './Header';
import { useForm, useFormState, useWatch } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';

let renderCount = 0;

type FormValues = {
  firstName: string;
  lastName: string;
};

const Controller = ({ control, register, name, rules, render }: any) => {
  // これやらないとdefault valueが表示されない
  const value = useWatch({
    control,
    name,
  });

  // バリデーションエラーを取得。formState: { errors } と書いている箇所と同様の挙動
  const { errors } = useFormState({
    control,
    name,
  });
  console.log(errors);

  // lastNameをregisterしているので、submit時にはlastNameも送信される
  const registered = register(name, rules);
  console.log(`registered ${name}`, registered);

  return render({
    onChange: (e: any) => {
      registered.onChange({
        target: {
          name,
          value: e.target.value,
        },
      });
    },
    onBlur: registered.onBlur,
    name: registered.name,
    value,
  });
};

const Input = (props: any) => {
  const [value, setValue] = useState(props.value || '');

  return (
    <input
      name={props.name}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange?.(e);
      }}
      value={value}
    />
  );
};

export default function App() {
  const { register, handleSubmit, control, setValue } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: 'test',
    },
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
  renderCount++;

  useEffect(() => {
    setTimeout(() => {
      setValue('lastName', 'test');
    }, 1000);
  }, [setValue]);

  return (
    <div>
      <Headers
        renderCount={renderCount}
        description="Performant, flexible and extensible forms with easy-to-use validation."
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName')} placeholder="First Name" />
        <Controller
          {...{
            control,
            register,
            name: 'lastName',
            rules: { required: true },
            render: (props: any) => <Input {...props} />,
          }}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
