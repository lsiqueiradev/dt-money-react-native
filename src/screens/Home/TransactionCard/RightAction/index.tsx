import { useState } from "react";

import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import * as transactionService from "@/shared/services/dt-money/transaction.service";

import { DeleteModal } from "./DeleteModal";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "@/contexts/snackbar.context";

interface RightActionParams {
  transactionId: number;
}

export function RightAction({ transactionId }: RightActionParams) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { notify } = useSnackbarContext();

  const { handleError } = useErrorHandler();

  const handleShowModal = () => setModalVisible(true);
  const handleHideModal = () => setModalVisible(false);

  const handleDeleteTransaction = async () => {
    try {
      setLoading(true);
      await transactionService.deleteTransaction(transactionId);
      notify({
        message: "Transação deletada com sucesso",
        messageType: "SUCCESS",
      });
      handleHideModal();
    } catch (error) {
      handleError(error, "Falha ao deletar transação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        className="h-[140] bg-accent-red-background-primary w-[80] rounded-r-[6] items-center justify-center"
        onPress={handleShowModal}
      >
        <MaterialIcons name="delete-outline" className="text-white" size={20} />
      </TouchableOpacity>
      <DeleteModal
        loading={isLoading}
        visible={modalVisible}
        hideModal={handleHideModal}
        handleDeleteTransaction={handleDeleteTransaction}
      />
    </>
  );
}
