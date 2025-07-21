import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { useRef, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface InputParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  label?: string;
}

export function Input<T extends FieldValues>({
  control,
  name,
  leftIconName,
  label,
  ...rest
}: InputParams<T>) {
  const [isFocused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const checkFocus = () => {
    if (inputRef.current) {
      setFocused(inputRef.current.isFocused());
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <View className="w-full mt-4">
            {label && (
              <Text
                className={clsx(
                  "mb-2 mt-3 text-base",
                  isFocused ? "text-accent-brand" : "text-gray-600"
                )}
              >
                {label}
              </Text>
            )}
            <TouchableOpacity className="flex-row items-center justify-between border-b-[1px] border-gray-600 px-3 py-2 h-16 ">
              {leftIconName && (
                <MaterialIcons
                  name={leftIconName}
                  size={24}
                  className={clsx(
                    "mr-2",
                    isFocused ? "text-accent-brand" : "text-gray-600"
                  )}
                />
              )}
              <TextInput
                value={value}
                onChangeText={onChange}
                className="flex-1 text-base text-gray-500 placeholder:text-gray-700"
                ref={inputRef}
                onFocus={checkFocus}
                onEndEditing={checkFocus}
                {...rest}
              />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
}
