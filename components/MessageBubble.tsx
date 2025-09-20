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
      paddingVertical: 16,
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
      {!isFromUser && (
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeWguMX2rGh8CLDPTY6al5b--jU8TGQhmfzJ8o_lVmEsD62dtS77wiW30gUQO8SlsDW5X1Pp6hrjIK18bVCnLyui-xLxbJnEws-zfibCnI9bIIfa0zqruGWV11U_Pi2rnbfWb1UkcZOjAOCSmHPdTzSDvX2WZukAetAn4LqSILierQcsv-pqd1Al9r49rJqqICmtBSsjU_EjaDGfoT1iWx2u9arc43JTEyEM4C7Bn5FLisKj6aZSSD3gUdQ1j9zsDfxmHxn6JTe-c",
          }}
          style={styles.avatar}
          alt={`${sender} profile picture`}
        />
      )}
      <View style={styles.messageContent}>
        <Text style={styles.senderName}>{sender}</Text>
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
      {isFromUser && (
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXZs2_m9MKUQCvTUYc46TYTYCusRZjPKGYGjvZ62CMdXzPH2jiht1uAoU4t3_-3GRJhdEFWBhPLqUdJrD0B5kDol6BEe8BO5vyZx0AVGvYOzGlE9mh8F82leii4MRqzNUcppRZK78NliAAc6mFLDGHKGlkc2f4ibmNF1MXLSAuKA2lJbz3GS18t1Vkv23Gccj_zso5qu2iyOICClr7PPPHYguXZkgZeWBTuntgDdrhWlkL2pU7y197Cgdlsr7SwTf6kpl51nu67Do",
          }}
          style={styles.avatar}
          alt="User profile picture"
        />
      )}
    </View>
  );
};
