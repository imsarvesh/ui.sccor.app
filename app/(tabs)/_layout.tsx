import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const activeTintColor = colorScheme === "dark" ? "#ffffff" : "#4c0303"; // White in dark theme, black in light theme
  const inactiveTintColor = useThemeColor({}, "secondaryText");
  const tabBarBackgroundColor = useThemeColor({}, "backgroundPrimary");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            backgroundColor: tabBarBackgroundColor,
          },
          default: {
            backgroundColor: tabBarBackgroundColor,
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
