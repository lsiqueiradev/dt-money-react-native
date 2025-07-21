import { Text, View } from "react-native";

import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

import { PublicStackParamList } from "@/routes/PublicRoutes";

import { useAuthContext } from "@/contexts/auth.context";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AppError } from "@/shared/helpers/AppError";
export interface FormLoginParams {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { handleAuthenticate } = useAuthContext();

  const navigation = useNavigation<NavigationProp<PublicStackParamList>>();

  const onSubmit = async (data: FormLoginParams) => {
    try {
      await handleAuthenticate(data);
    } catch (error) {
      console.log(error instanceof AppError);
      if (error instanceof AxiosError) console.log(error.response?.data);
    }
  };

  return (
    <>
      <Input
        control={control}
        name="email"
        label="EMAIL"
        placeholder="Seu email"
        leftIconName="mail-outline"
        autoCapitalize="none"
      />

      <Input
        control={control}
        name="password"
        label="SENHA"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />
      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <Button iconName="arrow-forward" onPress={handleSubmit(onSubmit)}>
          Login
        </Button>

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Ainda não possui uma conta?
          </Text>
          <Button
            iconName="arrow-forward"
            mode="outline"
            onPress={() => navigation.navigate("Register")}
          >
            Cadastrar
          </Button>
        </View>
      </View>
    </>
  );
}
