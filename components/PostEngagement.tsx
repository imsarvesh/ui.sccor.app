// Bright blue from the logo
import { HStack, Pressable, Text } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Fonts } from "../constants/Fonts";
import { useThemeColor } from "../hooks/useThemeColor";

interface PostEngagementProps {
  likes: number;
  comments: number;
  isLiked: boolean;
  onLikePress: () => void;
  onCommentPress: () => void;

  customStyles?: {
    container?: any;
    item?: any;
    text?: any;
  };
}

const PostEngagement: React.FC<PostEngagementProps> = ({
  likes,
  comments,
  isLiked,
  onLikePress,
  onCommentPress,
  customStyles = {},
}) => {
  const tintColor = useThemeColor({}, "tint");
  const secondaryTextColor = useThemeColor(
    { light: "#9c4949", dark: "#a0a0a0" },
    "text"
  );

  const styles = StyleSheet.create({
    postEngagement: {
      gap: 0,
      ...customStyles.container,
    },
    engagementItem: {
      alignItems: "center",
      gap: 4,
      paddingRight: 8,
      paddingVertical: 0,
      ...customStyles.item,
    },
    engagementText: {
      fontSize: 13,
      fontFamily: Fonts.notoSans.bold,
      color: secondaryTextColor,
      ...customStyles.text,
    },
  });

  return (
    <HStack style={styles.postEngagement}>
      <Pressable style={styles.engagementItem} onPress={onLikePress}>
        <HStack style={styles.engagementItem}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? "#f20d0d" : tintColor}
          />
          <Text style={styles.engagementText}>{likes}</Text>
        </HStack>
      </Pressable>

      <Pressable style={styles.engagementItem} onPress={onCommentPress}>
        <HStack style={styles.engagementItem}>
          <Ionicons name="chatbubble-outline" size={20} color={tintColor} />
          <Text style={styles.engagementText}>{comments}</Text>
        </HStack>
      </Pressable>
    </HStack>
  );
};

export default PostEngagement;
