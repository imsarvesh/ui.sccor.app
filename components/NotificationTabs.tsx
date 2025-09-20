import { HStack, Pressable } from "@/components/ui";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { Fonts } from "../constants/Fonts";
import { useThemeColor } from "../hooks/useThemeColor";

interface NotificationTabsProps {
  activeTab: "all" | "followers" | "likes";
  onTabChange: (tab: "all" | "followers" | "likes") => void;
}

const NotificationTabs: React.FC<NotificationTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      paddingHorizontal: 12,
      paddingVertical: 12,
      gap: 12,
    },
    tab: {
      height: 32,
      paddingHorizontal: 16,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 16,
      backgroundColor: iconColor + "20", // 20% opacity
    },
    activeTab: {
      backgroundColor: tintColor,
    },
    tabText: {
      fontSize: 14,
      fontFamily: Fonts.lexend.medium,
      color: textColor,
    },
    activeTabText: {
      color: "#FFFFFF",
    },
  });

  const tabs = [
    { key: "all" as const, label: "All" },
    { key: "followers" as const, label: "Followers" },
    { key: "likes" as const, label: "Likes" },
  ];

  return (
    <HStack style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabChange(tab.key)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText,
            ]}
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </HStack>
  );
};

export default NotificationTabs;
