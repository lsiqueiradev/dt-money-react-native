import { Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { TransactionTypes } from "@/shared/enums/transactions-types";
import { useTransactionContext } from "@/contexts/transaction.context";
import { ICONS } from "./strategies/icon-strategy";
import { CARD_DATA } from "./strategies/card-strategy";

export type TransactionCardType = TransactionTypes | "total";

type TransactionCardProps = {
  type: TransactionCardType;
  amount: number;
};

export function TransactionCard({ type, amount }: TransactionCardProps) {
  const iconsData = ICONS[type];
  const cardData = CARD_DATA[type];

  const { transactions } = useTransactionContext();

  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type
  );

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
        {type !== "total" && (
          <Text>
            {lastTransaction?.createdAt
              ? format(
                  lastTransaction?.createdAt,
                  `'Última ${cardData.label.toLocaleLowerCase()} em' d 'de' MMMM`,
                  { locale: ptBR }
                )
              : "Nenhuma transação encontrada"}
          </Text>
        )}
      </View>
    </View>
  );
}
