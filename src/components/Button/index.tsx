import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import clsx from "clsx";

type ButtonMode = "fill" | "outline";

interface ButtonProps extends TouchableOpacityProps {
  mode?: ButtonMode;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

export function Button({
  children,
  mode = "fill",
  iconName,
  ...rest
}: ButtonProps) {
  const isFill = mode === "fill";

  return (
    <TouchableOpacity
      {...rest}
      className={clsx(
        "w-full rounded-xl px-5 flex-row items-center h-button",
        iconName ? "justify-between" : "justify-center",
        {
          "bg-accent-brand": isFill,
          "bg-none border-[1px] border-accent-brand": !isFill,
        }
      )}
    >
      <Text
        className={clsx("text-base", {
          "text-white": isFill,
          "text-accent-brand": !isFill,
        })}
      >
        {children}
      </Text>
      {iconName && (
        <MaterialIcons
          name={iconName}
          size={24}
          className={clsx({
            "text-white": isFill,
            "text-accent-brand": !isFill,
          })}
        />
      )}
    </TouchableOpacity>
  );
}
