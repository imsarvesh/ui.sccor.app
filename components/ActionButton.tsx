import { Box, Pressable } from "@/components/ui";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { Fonts } from "../constants/Fonts";
import { useThemeColor } from "../hooks/useThemeColor";

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  fullWidth = true,
}) => {
  const tintColor = useThemeColor({}, "tint");

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    button: {
      backgroundColor: variant === "primary" ? tintColor : "transparent",
      borderRadius: 20,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: variant === "secondary" ? 1 : 0,
      borderColor: variant === "secondary" ? tintColor : "transparent",
      minWidth: fullWidth ? undefined : 84,
      maxWidth: fullWidth ? 480 : undefined,
    },
    text: {
      color: variant === "primary" ? "#FFFFFF" : tintColor,
      fontSize: 14,
      fontFamily: Fonts.lexend.bold,
    },
  });

  return (
    <Box style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </Box>
  );
};

export default ActionButton;
