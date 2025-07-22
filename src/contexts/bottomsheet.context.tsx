import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useState,
} from "react";

interface BottomSheetContextType {
  openBottomSheet: (content: ReactNode, index: number) => void;
  closeBottomSheet: () => void;
}

export const BottomSheetContext = createContext<BottomSheetContextType>(
  {} as BottomSheetContextType
);

export const BottomSheetProvider = ({ children }: PropsWithChildren) => {
  const [content, setContent] = useState<ReactNode | null>(null);

  const openBottomSheet = useCallback(
    (newContent: ReactNode, index: number) => {
      setContent(newContent);
    },
    []
  );

  const closeBottomSheet = useCallback(() => {
    setContent(null);
  }, []);

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}
    </BottomSheetContext.Provider>
  );
};
