import './App.css';
import Headers from './Header';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Control, SubmitHandler } from 'react-hook-form/dist/types/form';

let renderCount = 0;

type FormValues = {
  cart: {
    name: string;
    amount: number;
  }[];
};

type TotalAmountProp = {
  control: Control<FormValues>;
};

function getTotal(payload: FormValues['cart']) {
  let total = 0;

  for (const item of payload) {
    total = total + (Number.isNaN(item.amount) ? 0 : item.amount);
  }

  return total;
}

function TotalAmount({ control }: TotalAmountProp) {
  const cartValues = useWatch({ control, name: 'cart' });

  console.log('watch cartValues', cartValues);

  return <p>{getTotal(cartValues)}</p>;
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      cart: [{ name: '', amount: 0 }],
    },
  });
  const { fields, append, prepend, remove } = useFieldArray({
    name: 'cart',
    control,
    rules: {
      required: 'Please append at least 1 item',
      // fieldArray全体のvalidationも可能
      // validate: () => {},
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  console.log('watch whole', watch());

  renderCount++;

  return (
    <div>
      <Headers
        renderCount={renderCount}
        description="Performant, flexible and extensible forms with easy-to-use validation."
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <section key={field.id}>
              <label htmlFor="">
                <span>Name</span>
                <input type="text" {...register(`cart.${index}.name`)} />
              </label>
              <label htmlFor="">
                <span>Amount</span>
                <input
                  type="number"
                  {...register(`cart.${index}.amount`, { valueAsNumber: true })}
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  remove(index);
                }}
              >
                Remove
              </button>
            </section>
          );
        })}
        <button
          type="button"
          onClick={() => append({ name: 'ryota', amount: 0 })}
        >
          Append
        </button>
        <button
          type="button"
          onClick={() => prepend({ name: 'ryota', amount: 0 })}
        >
          Prepend
        </button>

        <TotalAmount control={control} />

        <p style={{ color: 'red' }}>{errors.cart?.root?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
}
