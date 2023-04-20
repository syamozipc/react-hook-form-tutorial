import "./App.css";
import Headers from "./Header";
import { useForm } from "react-hook-form";

let renderCount = 0;

export default function App() {
  const {
    register,
    handleSubmit,
    // formの状態を確認可能
    formState: { errors },
  } = useForm();
  renderCount++;
  // バリデーションエラーが格納されている
  console.log(errors);

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
          {...register("firstName", { required: true })}
          placeholder="First Name"
        />
        <input
          {...register("lastName", { required: true, minLength: 4 })}
          placeholder="Last Name"
        />
        <input type="submit" />
      </form>
    </div>
  );
}
