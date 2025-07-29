import { createContext, PropsWithChildren, useContext, useState } from "react";

import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-resquest";
import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";
import * as transactionService from "@/shared/services/dt-money/transaction.service";

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
  categories: TransactionCategory[];
};

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

export const TransactionContextProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: CreateTransactionInterface) => {
    await transactionService.createTransaction(transaction);
  };

  return (
    <TransactionContext.Provider
      value={{ categories, fetchCategories, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error("TransactionContextProvider not exists in app");
  }
  return context;
};
