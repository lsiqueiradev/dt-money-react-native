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

interface Loadings {
  initial: boolean;
  refresh: boolean;
  loadMore: boolean;
}

interface HandleLoadingsParams {
  key: keyof Loadings;
  value: boolean;
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
  loadMoreTransactions: () => Promise<void>;
  loadings: Loadings;
  handleLoadings: (params: HandleLoadingsParams) => void;
};

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

export const TransactionContextProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loadings, setLoadings] = useState<Loadings>({
    initial: false,
    refresh: false,
    loadMore: false,
  });
  const [totalTransactions, setTotalTransactions] =
    useState<ITotalTransactions>({ expense: 0, revenue: 0, total: 0 });
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 5,
    totalRows: 0,
    totalPages: 0,
  });

  const handleLoadings = ({ key, value }: HandleLoadingsParams) =>
    setLoadings((prevValue) => ({ ...prevValue, [key]: value }));

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination;
    const transactionResponse = await transactionService.getTransactions({
      page: 1,
      perPage: page * perPage,
    });
    setTransactions(transactionResponse.data);
    setTotalTransactions(transactionResponse.totalTransactions);
    setPagination({
      ...pagination,
      page,
      totalRows: transactionResponse.totalRows,
      totalPages: transactionResponse.totalPages,
    });
  }, [pagination]);

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionsParams) => {
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
        totalPages: transactionResponse.totalPages,
      });
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

  const loadMoreTransactions = useCallback(async () => {
    if (loadings.loadMore || pagination.page >= pagination.totalPages) return;
    fetchTransactions({ page: pagination.page + 1 });
  }, [loadings.loadMore, pagination]);

  return (
    <TransactionContext.Provider
      value={{
        loadMoreTransactions,
        loadings,
        handleLoadings,
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
