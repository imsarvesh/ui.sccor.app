import { Box, HStack, Pressable, Text } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

import config from "@/constants/configs";
import { useStore } from "@/providers";
import { Fonts } from "../constants/Fonts";
import { useThemeColor } from "../hooks/useThemeColor";

interface HeaderProps {
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onSearchPress?: () => void;
  onMailPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onMenuPress,
  onNotificationPress,
  onSearchPress,
  onMailPress,
}) => {
  const router = useRouter();
  const store = useStore();
  const me = store?.me;
  const profileImage = me?.image ? { uri: me?.image } : config.defaultAvatar;
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");

  const styles = StyleSheet.create({
    header: {
      backgroundColor: backgroundColor,
      paddingVertical: 2,
      paddingHorizontal: 11,
      paddingBottom: 8,
    },
    headerContent: {
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 18,
      fontFamily: Fonts.lexend.bold,
      color: textColor,
      flex: 1,
      textAlign: "center",
    },
    headerIcon: {
      width: 48,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
    },
    badge: {
      position: "absolute",
      top: 6,
      right: 0,
      backgroundColor: "#FF3B30",
      borderRadius: 10,
      minWidth: 22,
      height: 22,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
    },
    badgeText: {
      color: "white",
      fontSize: 12,
      fontFamily: Fonts.lexend.bold,
    },
    iconContainer: {
      position: "relative",
    },
  });

  return (
    <View style={styles.header}>
      <HStack style={styles.headerContent}>
        <Pressable style={styles.headerIcon} onPress={onMenuPress}>
          <View style={{ width: 48, height: 48, justifyContent: "center" }}>
            <Image
              source={profileImage}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
              }}
              alt="Profile picture"
            />
          </View>
        </Pressable>

        <HStack>
          <Pressable
            style={styles.headerIcon}
            onPress={() => router.push("/messages")}
          >
            <Ionicons name="mail-outline" size={24} color={iconColor} />
          </Pressable>
          <Box style={styles.iconContainer}>
            <Pressable
              style={styles.headerIcon}
              onPress={() => router.push("/notification")}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color={iconColor}
              />
            </Pressable>
            <Box style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </Box>
          </Box>
          <Pressable
            style={styles.headerIcon}
            onPress={() => router.push("/search")}
          >
            <Ionicons name="search-outline" size={24} color={iconColor} />
          </Pressable>
        </HStack>
      </HStack>
    </View>
  );
};

export default Header;
