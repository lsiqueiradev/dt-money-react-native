import {
  createContext,
  PropsWithChildren,
  use,
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
import { Pagination } from "@/shared/interfaces/https/get-transactions-request";

interface FetchTransactionsParams {
  page: number;
}

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: TransactionCategory[];
  fetchTransactions: (params: FetchTransactionsParams) => Promise<void>;
  updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>;
  createTransaction: (transaction: CreateTransactionInterface) => Promise<void>;
  totalTransactions: ITotalTransactions;
  transactions: ITransaction[];
  refreshTransactions: () => Promise<void>;
  isLoading: boolean;
};

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

export const TransactionContextProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [totalTransactions, setTotalTransactions] =
    useState<ITotalTransactions>({ expense: 0, revenue: 0, total: 0 });
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 15,
    totalRows: 0,
  });

  const refreshTransactions = async () => {
    setLoading(true);
    const transactionResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    });
    setTransactions(transactionResponse.data);
    setTotalTransactions(transactionResponse.totalTransactions);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionsParams) => {
      setLoading(true);
      const transactionResponse = await transactionService.getTransactions({
        page,
        perPage: pagination.perPage,
      });

      if (page === 1) {
        setTransactions(transactionResponse.data);
      } else {
        setTransactions((prevState) => [
          ...prevState,
          ...transactionResponse.data,
        ]);
      }

      setTotalTransactions(transactionResponse.totalTransactions);
      setPagination({
        ...pagination,
        page,
        totalRows: transactionResponse.totalRows,
      });
      setLoading(false);
    },
    [pagination]
  );

  const createTransaction = async (transaction: CreateTransactionInterface) => {
    await transactionService.createTransaction(transaction);
    refreshTransactions();
  };

  const updateTransaction = async (transaction: UpdateTransactionInterface) => {
    await transactionService.updateTransaction(transaction);
    refreshTransactions();
  };

  return (
    <TransactionContext.Provider
      value={{
        isLoading,
        fetchCategories,
        categories,
        fetchTransactions,
        createTransaction,
        updateTransaction,
        transactions,
        totalTransactions,
        refreshTransactions,
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
