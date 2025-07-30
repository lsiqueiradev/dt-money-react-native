import { View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { TransactionTypes } from "@/shared/enums/transactions-types";

type TransactionCardType = TransactionTypes | "total";

type TransactionCardProps = {
  type: TransactionCardType;
  amount: number;
};

interface IconsData {
  name: keyof typeof MaterialIcons.glyphMap;
  className: string;
}

const ICONS: Record<TransactionCardType, IconsData> = {
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

export function TransactionCard({ type, amount }: TransactionCardProps) {
  const iconsData = ICONS[type];
  return (
    <View>
      <MaterialIcons
        name={iconsData.name}
        className={iconsData.className}
        size={26}
      />
    </View>
  );
}
