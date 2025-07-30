import { useEffect } from "react";

import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTransactionContext } from "@/contexts/transaction.context";

import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";
import { RefreshControl } from "react-native-gesture-handler";

export function Home() {
  const { handleError } = useErrorHandler();
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    isLoading,
    loadMoreTransactions,
  } = useTransactionContext();

  const handleFetchCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error, "Falha ao buscar as categorias");
    }
  };

  const handleFetchTransactions = async () => {
    try {
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Falha ao buscar as transações");
    }
  };

  const handleLoadMoreTransactions = async () => {
    try {
      await loadMoreTransactions();
    } catch (error) {
      handleError(error, "Falha ao carregar novas transações");
    }
  };

  const handleRefreshTransactions = async () => {
    try {
      await refreshTransactions();
    } catch (error) {
      handleError(error, "Falha ao recarregar as transações");
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([handleFetchCategories(), handleFetchTransactions()]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        data={transactions}
        keyExtractor={(item) => `transaction-${item.id}`}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        ListHeaderComponent={<ListHeader />}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefreshTransactions}
          />
        }
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}
