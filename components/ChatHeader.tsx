import { Icon, IconName } from "@/components/ui";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Fonts } from "../constants/Fonts";

interface ChatHeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: {
    icon: IconName;
    onPress: () => void;
  };
  colors: {
    primaryText: string;
    backgroundPrimary: string;
  };
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  onBack,
  rightAction,
  colors,
}) => {
  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.backgroundPrimary,
      paddingHorizontal: 16,
      paddingVertical: 16,
      paddingBottom: 8,
      justifyContent: "space-between",
    },
    backButton: {
      width: 48,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      flex: 1,
      fontSize: 18,
      fontFamily: Fonts.lexend.bold,
      color: colors.primaryText,
      textAlign: "center",
      paddingRight: onBack ? 48 : 0,
      paddingLeft: onBack ? 0 : 48,
    },
    rightButton: {
      width: 48,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Icon name="arrow-back" size={24} color={colors.primaryText} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {rightAction && (
        <TouchableOpacity
          style={styles.rightButton}
          onPress={rightAction.onPress}
        >
          <Icon name={rightAction.icon} size={20} color={colors.primaryText} />
        </TouchableOpacity>
      )}
    </View>
  );
};
