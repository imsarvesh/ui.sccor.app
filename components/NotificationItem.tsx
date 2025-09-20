import React from "react";
import { Image, StyleSheet } from "react-native";
import { Box, Text } from "@/components/ui";
import { Fonts } from "../constants/Fonts";
import { useThemeColor } from "../hooks/useThemeColor";

interface NotificationItemProps {
  name: string;
  message: string;
  avatar: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  name,
  message,
  avatar,
}) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 8,
      minHeight: 72,
      backgroundColor: backgroundColor,
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      marginRight: 16,
    },
    content: {
      flex: 1,
      justifyContent: "center",
    },
    name: {
      fontSize: 16,
      fontFamily: Fonts.lexend.medium,
      color: textColor,
      marginBottom: 4,
    },
    message: {
      fontSize: 14,
      fontFamily: Fonts.lexend.regular,
      color: iconColor,
      lineHeight: 20,
    },
  });

  return (
    <Box style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Box style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message}>{message}</Text>
      </Box>
    </Box>
  );
};

export default NotificationItem;
