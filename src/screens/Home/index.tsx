import { useEffect } from "react";

import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthContext } from "@/contexts/auth.context";
import { useTransactionContext } from "@/contexts/transaction.context";

import { Header } from "@/components/Header";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

export function Home() {
  const { handleError } = useErrorHandler();
  const { handleLogout } = useAuthContext();
  const { fetchCategories } = useTransactionContext();

  const handleFetchCtegories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error, "Falha ao buscar as categorias");
    }
  };

  useEffect(() => {
    (async () => {
      await handleFetchCtegories();
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary ">
      <Header />
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
