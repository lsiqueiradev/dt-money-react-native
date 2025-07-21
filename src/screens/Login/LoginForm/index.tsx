import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";

export interface FormLoginParams {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>();

  return (
    <>
      <Input
        control={control}
        name="email"
        label="E-mail"
        placeholder="mail@mail.com"
      />
    </>
  );
}
