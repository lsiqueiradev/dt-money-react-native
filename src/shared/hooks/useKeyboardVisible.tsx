import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

export function useKeyboardVisible() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const keyboardShowTag =
    Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
  const keyboardHideTag =
    Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(keyboardShowTag, () => {
      setKeyboardVisible(true);
    });

    const keyboardHideListener = Keyboard.addListener(keyboardHideTag, () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardHideListener.remove();
      keyboardShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
}
