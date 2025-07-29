import { useState } from "react";

import { Text, TextInput, TouchableOpacity, View } from "react-native";

import CurrencyInput from "react-native-currency-input";

import { MaterialIcons } from "@expo/vector-icons";

import { useBottomSheetContext } from "@/contexts/bottomsheet.context";
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-resquest";
import clsx from "clsx";
import * as Yup from "yup";
import { Button } from "../Button";
import { SelectCategoryModal } from "../SelectCategoryModal";
import { TransactionTypeSelector } from "../SelectyType";
import { transactionSchema } from "./schema";

type ValidationErrorsTypes = Record<keyof CreateTransactionInterface, string>;

export function NewTransaction() {
  const { closeBottomSheet } = useBottomSheetContext();

  const [transaction, setTransaction] = useState<CreateTransactionInterface>({
    categoryId: 0,
    description: "",
    typeId: 0,
    value: 0,
  });
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsTypes>();

  const handleCreateTransaction = async () => {
    try {
      await transactionSchema.validate(transaction, { abortEarly: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as ValidationErrorsTypes;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof CreateTransactionInterface] = err.message;
          }
        });

        setValidationErrors(errors);
      }
    }
  };

  const handleSetTransaction = (
    key: keyof CreateTransactionInterface,
    value: string | number
  ) => {
    setTransaction((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="w-full flex-row items-center justify-between"
        onPress={() => closeBottomSheet()}
      >
        <Text className="text-white text-xl font-bold">Nova transação</Text>
        <MaterialIcons name="close" className="text-gray-700" size={20} />
      </TouchableOpacity>
      <View className="flex-1 my-8">
        <TextInput
          onChangeText={(text) => handleSetTransaction("description", text)}
          placeholder="Descrição"
          value={transaction.description}
          className="text-white native:placeholder:text-gray-700 text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
        />
        <CurrencyInput
          className={clsx(
            "native:placeholder:text-gray-700 text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4",
            transaction.value === 0 ? "text-gray-700" : "text-white"
          )}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => handleSetTransaction("value", value ?? 0)}
          value={transaction.value}
        />
        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) =>
            handleSetTransaction("categoryId", categoryId)
          }
        />
        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(typeId) =>
            handleSetTransaction("typeId", typeId)
          }
        />
        <View className="my-4">
          <Button onPress={handleCreateTransaction}>
            <Text>Registrar</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
