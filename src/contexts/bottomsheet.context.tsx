import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { colors } from "@/shared/colors";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface BottomSheetContextType {
  openBottomSheet: (content: ReactNode, index: number) => void;
  closeBottomSheet: () => void;
}

export const BottomSheetContext = createContext<BottomSheetContextType>(
  {} as BottomSheetContextType
);

export const BottomSheetContextProvider = ({ children }: PropsWithChildren) => {
  const { bottom } = useSafeAreaInsets();
  const [content, setContent] = useState<ReactNode | null>(null);
  const [index, setIndex] = useState(-1);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["70%", "90%"], []);

  const openBottomSheet = useCallback(
    (newContent: ReactNode, index: number) => {
      setIndex(index);
      setContent(newContent);
      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(index);
      });
    },
    []
  );

  const closeBottomSheet = useCallback(() => {
    setContent(null);
    setIndex(-1);
    bottomSheetRef.current?.close();
  }, []);

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    );
  }, []);

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={index}
        style={{ zIndex: 2 }}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: colors["background-secondary"],
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          elevation: 8,
        }}
        handleIndicatorStyle={{ backgroundColor: colors["white"] }}
      >
        <BottomSheetScrollView contentContainerClassName="pb-safe">
          {content}
        </BottomSheetScrollView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error("BottomSheetContextProvider not exists in app");
  }
  return context;
};
