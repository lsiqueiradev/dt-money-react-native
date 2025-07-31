import { useEffect } from "react";

import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTransactionContext } from "@/contexts/transaction.context";

import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";
import { RefreshControl } from "react-native-gesture-handler";
import { EmptyList } from "./EmptyList";

export function Home() {
  const { handleError } = useErrorHandler();
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    loadings,
    handleLoadings,
    loadMoreTransactions,
  } = useTransactionContext();

  const handleFetchCategories = async () => {
    try {
      handleLoadings({ key: "initial", value: true });
      await fetchCategories();
    } catch (error) {
      handleError(error, "Falha ao buscar as categorias");
    } finally {
      handleLoadings({ key: "initial", value: false });
    }
  };

  const handleFetchInicialTransactions = async () => {
    try {
      handleLoadings({ key: "initial", value: true });
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Falha ao buscar as transações");
    } finally {
      handleLoadings({ key: "initial", value: false });
    }
  };

  const handleLoadMoreTransactions = async () => {
    try {
      handleLoadings({ key: "loadMore", value: true });
      await loadMoreTransactions();
    } catch (error) {
      handleError(error, "Falha ao carregar novas transações");
    } finally {
      handleLoadings({ key: "loadMore", value: false });
    }
  };

  const handleRefreshTransactions = async () => {
    try {
      handleLoadings({ key: "refresh", value: true });
      await refreshTransactions();
    } catch (error) {
      handleError(error, "Falha ao recarregar as transações");
    } finally {
      handleLoadings({ key: "refresh", value: false });
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([
        handleFetchCategories(),
        handleFetchInicialTransactions(),
      ]);
    })();
  }, []);

  return (
    <View className="flex-1 bg-background-primary pt-safe">
      <FlatList
        className="bg-background-secondary"
        data={transactions}
        keyExtractor={(item) => `transaction-${item.id}`}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        contentContainerClassName="pb-safe"
        ListHeaderComponent={<ListHeader />}
        refreshControl={
          <RefreshControl
            refreshing={loadings.refresh}
            onRefresh={handleRefreshTransactions}
          />
        }
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={EmptyList}
      />
    </View>
  );
}
