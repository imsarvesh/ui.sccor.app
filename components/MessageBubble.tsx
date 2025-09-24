import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Fonts } from "../constants/Fonts";

interface MessageBubbleProps {
  text: string;
  isFromUser: boolean;
  sender: string;
  timestamp: string;
  hasImage?: boolean;
  imageUrl?: string;
  colors: {
    primaryText: string;
    secondaryText: string;
    userMessage: string;
    userMessageText: string;
    otherMessage: string;
    otherMessageText: string;
  };
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  isFromUser,
  sender,
  timestamp,
  hasImage,
  imageUrl,
  colors,
}) => {
  const styles = StyleSheet.create({
    messageContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 12,
      paddingHorizontal: 16,
      paddingVertical: 2,
      justifyContent: isFromUser ? "flex-end" : "flex-start",
    },
    messageContent: {
      flex: 1,
      alignItems: isFromUser ? "flex-end" : "flex-start",
    },
    senderName: {
      fontSize: 13,
      fontFamily: Fonts.notoSans.regular,
      color: colors.secondaryText,
      marginBottom: 4,
      maxWidth: 360,
      textAlign: isFromUser ? "right" : "left",
    },
    messageBubble: {
      maxWidth: 360,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      backgroundColor: isFromUser ? colors.userMessage : colors.otherMessage,
    },
    messageText: {
      fontSize: 16,
      fontFamily: Fonts.notoSans.regular,
      lineHeight: 20,
      color: isFromUser ? colors.userMessageText : colors.otherMessageText,
    },
    messageImage: {
      width: "100%",
      maxWidth: 360,
      height: 200,
      borderRadius: 12,
      marginTop: 8,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.secondaryText,
    },
  });

  return (
    <View style={styles.messageContainer}>
      <View style={styles.messageContent}>
        <View style={styles.messageBubble}>
          <Text style={styles.messageText}>{text}</Text>
        </View>
        {hasImage && imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.messageImage}
            alt="Message image"
          />
        )}
      </View>
    </View>
  );
};
