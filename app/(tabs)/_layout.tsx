import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import GlassTabBarBackground from "@/components/ui/GlassTabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const activeTintColor = colorScheme === "dark" ? "#ffffff" : "#0066FF"; // White in dark theme, blue in light theme
  const inactiveTintColor =
    colorScheme === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"; // Semi-transparent for glass effect
  const tabBarBackgroundColor = useThemeColor({}, "backgroundPrimary");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: GlassTabBarBackground,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarStyle: Platform.select({
          ios: {
            // Glass morphism effect for iOS
            position: "absolute",
            backgroundColor: "transparent",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            height: 90, // Slightly taller for better visual balance
            paddingBottom: 34, // Account for safe area
            paddingTop: 8,
          },
          default: {
            // Semi-transparent background for Android/Web
            backgroundColor: `${tabBarBackgroundColor}E6`, // 90% opacity
            borderTopWidth: 0.5,
            borderTopColor: "rgba(255, 255, 255, 0.1)",
            elevation: 0,
            shadowOpacity: 0,
            height: 70,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="globe" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Record",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="dot-circle-o" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="instructor"
        options={{
          title: "Instructors",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.2.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scores"
        options={{
          title: "Scores",
          tabBarIcon: ({ color }) => (
            <View style={{ position: "relative" }}>
              <IconSymbol size={28} name="chart.bar.fill" color={color} />
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 10,
                  height: 10,
                  backgroundColor: "red",
                  borderRadius: 5,
                }}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
