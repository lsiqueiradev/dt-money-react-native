import { MaterialIcons } from "@expo/vector-icons";

import { TransactionTypes } from "@/shared/enums/transactions-types";
import { TransactionCardType } from "..";

interface IconsData {
  name: keyof typeof MaterialIcons.glyphMap;
  className: string;
}

export const ICONS: Record<TransactionCardType, IconsData> = {
  [TransactionTypes.REVENUE]: {
    className: "text-accent-brand-light",
    name: "arrow-circle-up",
  },
  [TransactionTypes.EXPENSE]: {
    className: "text-accent-red",
    name: "arrow-circle-down",
  },
  total: {
    className: "text-white",
    name: "attach-money",
  },
};
