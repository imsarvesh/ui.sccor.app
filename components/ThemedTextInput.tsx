import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface ThemedTextInputProps extends TextInputProps {
  containerStyle?: any;
}

export const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  style,
  containerStyle,
  placeholderTextColor,
  ...props
}) => {
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");

  const styles = StyleSheet.create({
    inputContainer: {
      marginBottom: 16,
      minWidth: 160,
      flex: 1,
    },
    input: {
      height: 56,
      backgroundColor: iconColor + "20", // Add transparency for subtle background
      borderRadius: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      color: textColor,
      borderWidth: 0,
    },
  });

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={placeholderTextColor || iconColor}
        {...props}
      />
    </View>
  );
};
