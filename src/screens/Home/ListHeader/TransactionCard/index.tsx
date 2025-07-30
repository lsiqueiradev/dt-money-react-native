import { Text, View } from "react-native";

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

interface CardData {
  label: string;
  className: string;
}

const CARD_DATA: Record<TransactionCardType, CardData> = {
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

export function TransactionCard({ type, amount }: TransactionCardProps) {
  const iconsData = ICONS[type];
  const cardData = CARD_DATA[type];

  return (
    <View
      className={`${cardData.className} min-w-[280] rounded-[6] px-8 py-6 justify-between mr-6`}
    >
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-base">{cardData.label}</Text>
        <MaterialIcons
          name={iconsData.name}
          className={iconsData.className}
          size={26}
        />
      </View>
      <View>
        <Text className="text-2xl text-gray-400 font-bold">
          R$ {amount.toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </View>
  );
}
