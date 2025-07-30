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
import { UpdateTransactionInterface } from "@/shared/interfaces/https/update-transaction-resquest";
import clsx from "clsx";
import * as Yup from "yup";
import { transactionSchema } from "./schema";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SelectCategoryModal } from "@/components/SelectCategoryModal";
import { TransactionTypeSelector } from "@/components/SelectyType";
import { Button } from "@/components/Button";
import { ITransaction } from "@/shared/interfaces/transaction-interface";

type ValidationErrorsTypes = Record<keyof UpdateTransactionInterface, string>;

interface EditTransactionFormParams {
  transaction: ITransaction;
}

export function EditTransactionForm({
  transaction: transactionToUpdate,
}: EditTransactionFormParams) {
  const { closeBottomSheet } = useBottomSheetContext();
  const { updateTransaction } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const [isLoading, setLoading] = useState(false);

  const [transaction, setTransaction] = useState<UpdateTransactionInterface>({
    id: transactionToUpdate.id,
    description: transactionToUpdate.description,
    value: transactionToUpdate.value,
    typeId: transactionToUpdate.typeId,
    categoryId: transactionToUpdate.categoryId,
  });
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsTypes>();

  const handleCreateTransaction = async () => {
    try {
      setLoading(true);

      await transactionSchema.validate(transaction, { abortEarly: false });
      await updateTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as ValidationErrorsTypes;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof UpdateTransactionInterface] = err.message;
          }
        });

        setValidationErrors(errors);
      } else {
        handleError(error, "Falha ao atualizar transação");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSetTransaction = (
    key: keyof UpdateTransactionInterface,
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
              <Text>Atualizar</Text>
            )}
          </Button>
        </View>
      </View>
    </View>
  );
}
