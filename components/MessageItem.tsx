import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Fonts } from "../constants/Fonts";

interface MessageItemProps {
  name: string;
  message: string;
  date: string;
  avatar: string;
  onPress: () => void;
  colors: {
    primaryText: string;
    secondaryText: string;
    backgroundPrimary: string;
  };
}

export const MessageItem: React.FC<MessageItemProps> = ({
  name,
  message,
  date,
  avatar,
  onPress,
  colors,
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colors.backgroundPrimary,
      minHeight: 72,
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
      color: colors.primaryText,
      fontSize: 16,
      fontFamily: Fonts.lexend.medium,
      lineHeight: 20,
    },
    message: {
      color: colors.secondaryText,
      fontSize: 14,
      fontFamily: Fonts.notoSans.regular,
      lineHeight: 18,
      marginTop: 2,
    },
    dateContainer: {
      alignItems: "flex-end",
    },
    date: {
      color: colors.secondaryText,
      fontSize: 14,
      fontFamily: Fonts.notoSans.regular,
      lineHeight: 18,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: avatar }}
        style={styles.avatar}
        alt={`${name} profile picture`}
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};
