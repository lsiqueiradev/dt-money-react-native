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
import { ITotalTransactions } from "@/shared/interfaces/total-transaction-interface";
import { UpdateTransactionInterface } from "@/shared/interfaces/https/update-transaction-resquest";

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: TransactionCategory[];
  fetchTransactions: () => Promise<void>;
  updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>;
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
  totalTransactions: ITotalTransactions;
  transactions: ITransaction[];
};

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

export const TransactionContextProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [totalTransactions, setTotalTransactions] =
    useState<ITotalTransactions>({ expense: 0, revenue: 0, total: 0 });

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
    setTransactions(transactionResponse.data);
    setTotalTransactions(transactionResponse.totalTransactions);
  }, []);

  const createTransaction = async (transaction: CreateTransactionInterface) => {
    await transactionService.createTransaction(transaction);
  };

  const updateTransaction = async (transaction: UpdateTransactionInterface) => {
    await transactionService.updateTransaction(transaction);
  };

  return (
    <TransactionContext.Provider
      value={{
        fetchCategories,
        categories,
        fetchTransactions,
        createTransaction,
        updateTransaction,
        transactions,
        totalTransactions,
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
