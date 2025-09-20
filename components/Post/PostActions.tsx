// Bright blue from the logo
import { HStack, Pressable, Text } from "@/components/ui";
import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useDispatch, useStore } from "@/providers/PostProvider";
import { useLikePost, useUnLikePost } from "@/service/hooks/usePost";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

interface PostEngagementProps {
  customStyles?: {
    container?: any;
    item?: any;
    text?: any;
  };
}

const PostEngagement: React.FC<PostEngagementProps> = ({
  customStyles = {},
}) => {
  const dispatch = useDispatch();
  const post = useStore();
  const { liked, likes, repliesCount } = post;

  const [isLiked, setIsLiked] = useState(liked);

  const onCompleted = ({ post }) => {
    dispatch({
      type: "UPDATE_POST",
      payload: post,
    });
  };

  const { like } = useLikePost({ onCompleted });
  const { unlike } = useUnLikePost({ onCompleted });

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
      <Pressable
        style={styles.engagementItem}
        onPress={() => {
          if (isLiked) {
            unlike(post);
          } else {
            like(post);
          }
          setIsLiked(!isLiked);
        }}
      >
        <HStack style={styles.engagementItem}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? "#f20d0d" : tintColor}
          />
          <Text style={styles.engagementText}>{likes}</Text>
        </HStack>
      </Pressable>

      <Pressable
        style={styles.engagementItem}
        onPress={() => {
          router.push(`/comments/${post.id}`);
        }}
      >
        <HStack style={styles.engagementItem}>
          <Ionicons name="chatbubble-outline" size={20} color={tintColor} />
          <Text style={styles.engagementText}>{repliesCount}</Text>
        </HStack>
      </Pressable>
    </HStack>
  );
};

export default PostEngagement;
