import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Fonts } from "../constants/Fonts";
import { useThemeColor } from "../hooks/useThemeColor";

interface LoadMoreButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  text?: string;
  colors?: {
    primaryText: string;
    secondaryText: string;
    backgroundSecondary: string;
    border: string;
  };
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onPress,
  isLoading = false,
  disabled = false,
  text = "Load More",
  colors,
}) => {
  const tintColor = useThemeColor({}, "tint");
  const defaultColors = {
    primaryText: useThemeColor({}, "text"),
    secondaryText: "#666666",
    backgroundSecondary: "#F8F9FA",
    border: "#E5E7EB",
  };

  const themeColors = colors || defaultColors;

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      alignItems: "center",
    },
    button: {
      backgroundColor: disabled ? themeColors.backgroundSecondary : tintColor,
      borderRadius: 12,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      maxWidth: 480,
      borderWidth: disabled ? 1 : 0,
      borderColor: disabled ? themeColors.border : "transparent",
      opacity: disabled ? 0.6 : 1,
    },
    text: {
      color: disabled ? themeColors.secondaryText : "#FFFFFF",
      fontSize: 16,
      fontFamily: Fonts.notoSans.medium,
      fontWeight: "600",
      textAlign: "center",
    },
    loadingContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    loadingText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontFamily: Fonts.notoSans.medium,
      fontWeight: "600",
    },
  });

  const isButtonDisabled = disabled || isLoading;

  console.log("isButtonDisabled", isButtonDisabled);

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      disabled={isButtonDisabled}
    >
      <Pressable style={styles.button} disabled={isButtonDisabled}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FFFFFF" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default LoadMoreButton;
