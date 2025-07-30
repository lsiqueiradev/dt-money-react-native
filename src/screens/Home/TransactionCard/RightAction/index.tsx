import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";

export function RightAction() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowModal = () => setModalVisible(true);
  const handleHideModal = () => setModalVisible(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        className="h-[140] bg-accent-red-background-primary w-[80] rounded-r-[6] items-center justify-center"
        onPress={handleShowModal}
      >
        <MaterialIcons name="delete-outline" className="text-white" size={20} />
      </TouchableOpacity>
      <DeleteModal visible={modalVisible} hideModal={handleHideModal} />
    </>
  );
}
