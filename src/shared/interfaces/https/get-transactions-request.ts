import { ITotalTransactions } from "../total-transaction-interface";
import { ITransaction } from "../transaction-interface";

export interface Pagination {
  page: number;
  perPage: number;
  totalRows?: number;
  totalPages: number;
}

export interface GetTransactionsParams {
  page: number;
  perPage: number;
  from?: Date;
  to?: Date;
  typeId?: number;
  categoryId?: number;
  searchText?: string;
}

export interface GetTransactionsResponse {
  data: ITransaction[];
  totalRows: number;
  totalPages: number;
  page: number;
  perPage: number;
  totalTransactions: ITotalTransactions;
}
