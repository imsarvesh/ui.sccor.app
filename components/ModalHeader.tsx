import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  closeButtonText?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
  closeButtonText = "Close",
}) => {
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      paddingBottom: 8,
      justifyContent: "space-between",
      backgroundColor: backgroundColor,
    },
    closeButton: {
      width: 48,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: 10,
    },
    headerTitle: {
      flex: 1,
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
      color: textColor,
    },
  });

  return (
    <ThemedView style={styles.header}>
      <ThemedText style={styles.headerTitle}>{title}</ThemedText>
      <Pressable onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={24} color={textColor} />
      </Pressable>
    </ThemedView>
  );
};
