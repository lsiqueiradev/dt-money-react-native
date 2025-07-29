import { useState } from "react";

import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import CurrencyInput from "react-native-currency-input";

import { MaterialIcons } from "@expo/vector-icons";

import { useBottomSheetContext } from "@/contexts/bottomsheet.context";
import { useTransactionContext } from "@/contexts/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-resquest";
import clsx from "clsx";
import * as Yup from "yup";
import { Button } from "../Button";
import { ErrorMessage } from "../ErrorMessage";
import { SelectCategoryModal } from "../SelectCategoryModal";
import { TransactionTypeSelector } from "../SelectyType";
import { transactionSchema } from "./schema";

type ValidationErrorsTypes = Record<keyof CreateTransactionInterface, string>;

export function NewTransaction() {
  const { closeBottomSheet } = useBottomSheetContext();
  const { createTransaction } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const [isLoading, setLoading] = useState(false);

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
      setLoading(true);

      await transactionSchema.validate(transaction, { abortEarly: false });
      await createTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as ValidationErrorsTypes;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof CreateTransactionInterface] = err.message;
          }
        });

        setValidationErrors(errors);
      } else {
        handleError(error, "Falha ao criar transação");
      }
    } finally {
      setLoading(false);
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
        {validationErrors?.description && (
          <ErrorMessage>{validationErrors?.description}</ErrorMessage>
        )}
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

        {validationErrors?.value && (
          <ErrorMessage>{validationErrors?.value}</ErrorMessage>
        )}
        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) =>
            handleSetTransaction("categoryId", categoryId)
          }
        />
        {validationErrors?.categoryId && (
          <ErrorMessage>{validationErrors?.categoryId}</ErrorMessage>
        )}
        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(typeId) =>
            handleSetTransaction("typeId", typeId)
          }
        />
        {validationErrors?.typeId && (
          <ErrorMessage>{validationErrors?.typeId}</ErrorMessage>
        )}
        <View className="my-4">
          <Button onPress={handleCreateTransaction}>
            {isLoading ? (
              <ActivityIndicator className="text-white" />
            ) : (
              <Text>Registrar</Text>
            )}
          </Button>
        </View>
      </View>
    </View>
  );
}
