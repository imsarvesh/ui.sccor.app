import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme } from "@/hooks/useColorScheme";

// Import BlurView conditionally to avoid TypeScript errors
let BlurView: any = null;
try {
  BlurView = require("expo-blur").BlurView;
} catch (error) {
  console.warn("expo-blur not available, using fallback");
}

export default function GlassTabBarBackground() {
  const colorScheme = useColorScheme();

  if (Platform.OS === "ios" && BlurView) {
    return (
      <BlurView
        intensity={95}
        tint={colorScheme === "dark" ? "dark" : "light"}
        style={[
          StyleSheet.absoluteFill,
          {
            borderTopWidth: 0.5,
            borderTopColor:
              colorScheme === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
          },
        ]}
      />
    );
  }

  // Enhanced fallback for Android and web with better glass effect
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor:
            colorScheme === "dark"
              ? "rgba(15, 15, 15, 0.85)"
              : "rgba(255, 255, 255, 0.85)",
          borderTopWidth: 0.5,
          borderTopColor:
            colorScheme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
          // Add subtle shadow for depth
          shadowColor: colorScheme === "dark" ? "#000" : "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: colorScheme === "dark" ? 0.3 : 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
      ]}
    />
  );
}

export function useBottomTabOverflow() {
  return 0;
}
