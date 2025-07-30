import { useEffect } from "react";

import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTransactionContext } from "@/contexts/transaction.context";

import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

import { ListHeader } from "./ListHeader";

export function Home() {
  const { handleError } = useErrorHandler();
  const { fetchCategories, fetchTransactions } = useTransactionContext();

  const handleFetchCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error, "Falha ao buscar as categorias");
    }
  };

  useEffect(() => {
    (async () => {
      await handleFetchCategories();
      await fetchTransactions();
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-secondary">
      <FlatList
        data={[]}
        renderItem={() => <></>}
        ListHeaderComponent={<ListHeader />}
      />
    </SafeAreaView>
  );
}
