import './App.css';
import Headers from './Header';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';

let renderCount = 0;

type FormValues = {
  firstName: string;
  lastName: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isValid, isDirty, dirtyFields, touchedFields },
  } = useForm<FormValues>({
    defaultValues: { firstName: 'ryota' },
    // keepErrorの検証に必要
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
  renderCount++;

  // 値がdefault valueから変わったかどうか
  console.log('isDirty', isDirty);
  // default valueから変わったinputを列挙
  console.log('dirtyFields', dirtyFields);
  // focus→blurされたinputを列挙
  console.log('touchedFields', touchedFields);

  return (
    <div>
      <Headers
        renderCount={renderCount}
        description="Performant, flexible and extensible forms with easy-to-use validation."
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('firstName', {
            required: 'this is required',
            minLength: { value: 4, message: 'minimum length is 4' },
          })}
          placeholder="First Name"
        />
        {/* resetFieldによりdefault valueに戻ると、validationを通る値のため、errorメッセージも消える */}
        <p>{errors.firstName?.message}</p>
        <p>{isValid ? 'valid' : 'not valid'}</p>
        {/* 指定したfieldをdefault valueに戻す */}
        <input
          {...register('lastName', {
            required: 'this is required',
            minLength: { value: 4, message: 'minimum length is 4' },
          })}
          placeholder="Last Name"
        />
        <button
          type="submit"
          // keepErrorにすると、errorが消えない
          onClick={() => resetField('firstName', { keepError: true })}
        >
          reset field
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
