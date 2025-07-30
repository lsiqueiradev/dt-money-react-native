import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-resquest";
import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";
import { ITransaction } from "@/shared/interfaces/transaction-interface";
import * as transactionService from "@/shared/services/dt-money/transaction.service";

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: TransactionCategory[];
  fetchTransactions: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
};

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

export const TransactionContextProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const fetchTransactions = useCallback(async () => {
    const transactionResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    });
    console.log(transactionResponse);
    setTransactions(transactionResponse.data);
  }, []);

  const createTransaction = async (transaction: CreateTransactionInterface) => {
    await transactionService.createTransaction(transaction);
  };

  return (
    <TransactionContext.Provider
      value={{
        fetchCategories,
        categories,
        fetchTransactions,
        createTransaction,
      }}
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
