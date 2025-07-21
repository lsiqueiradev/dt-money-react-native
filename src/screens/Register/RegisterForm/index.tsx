import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PublicStackParamList } from "@/routes/PublicRoutes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

export interface FormRegisterParams {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormRegisterParams>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<NavigationProp<PublicStackParamList>>();

  const onSubmit = () => {};

  return (
    <>
      <Input
        control={control}
        name="name"
        label="NOME"
        placeholder="Seu nome"
        leftIconName="person-outline"
      />
      <Input
        control={control}
        name="email"
        label="EMAIL"
        placeholder="Seu email"
        leftIconName="mail-outline"
      />

      <Input
        control={control}
        name="password"
        label="SENHA"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <Input
        control={control}
        name="password"
        label="CONFIRME A SENHA"
        placeholder="Confirme sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <Button iconName="arrow-forward" onPress={handleSubmit(onSubmit)}>
          Cadastrar
        </Button>

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Já possui uma conta?
          </Text>
          <Button
            iconName="arrow-forward"
            mode="outline"
            onPress={() => navigation.navigate("Login")}
          >
            Acessar
          </Button>
        </View>
      </View>
    </>
  );
}
