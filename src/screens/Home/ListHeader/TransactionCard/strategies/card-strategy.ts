import { TransactionTypes } from "@/shared/enums/transactions-types";
import { TransactionCardType } from "..";

interface CardData {
  label: string;
  className: string;
}

export const CARD_DATA: Record<TransactionCardType, CardData> = {
  [TransactionTypes.EXPENSE]: {
    label: "Saída",
    className: "bg-background-tertiary",
  },
  [TransactionTypes.REVENUE]: {
    label: "Entrada",
    className: "bg-background-tertiary",
  },
  total: {
    label: "Total",
    className: "bg-accent-brand-background-primary",
  },
};
