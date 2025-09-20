import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Fonts } from "../constants/Fonts";
import { useThemeColor } from "../hooks/useThemeColor";
import PostEngagement from "./PostEngagement";
import { Comment } from "./types";

interface CommentItemProps {
  comment: Comment;
  onLikePress: (commentId: number) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onLikePress }) => {
  const textColor = useThemeColor({}, "primaryText");
  const secondaryTextColor = useThemeColor({}, "secondaryText");
  const borderColor = useThemeColor({}, "border");

  const styles = StyleSheet.create({
    commentItem: {
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingVertical: 16,
      gap: 12,
    },
    commentUserImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: borderColor,
    },
    commentContent: {
      flex: 1,
    },
    commentHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 4,
    },
    commentUserName: {
      fontSize: 14,
      fontFamily: Fonts.lexend.bold,
      color: textColor,
      letterSpacing: 0.015,
    },
    commentTimestamp: {
      fontSize: 14,
      fontFamily: Fonts.lexend.regular,
      color: secondaryTextColor,
    },
    commentText: {
      fontSize: 14,
      fontFamily: Fonts.lexend.regular,
      color: textColor,
      lineHeight: 20,
      marginBottom: 8,
    },
    commentActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 36,
    },
    likeButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    likeCount: {
      fontSize: 14,
      fontFamily: Fonts.lexend.regular,
      color: secondaryTextColor,
    },
  });

  return (
    <View style={styles.commentItem}>
      <Image
        source={{ uri: comment.user.image }}
        style={styles.commentUserImage}
        alt={`${comment.user.name} profile picture`}
      />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUserName}>{comment.user.name}</Text>
          <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
        </View>
        <Text style={styles.commentText}>{comment.text}</Text>
        <View style={styles.commentActions}>
          <PostEngagement
            likes={comment.likes}
            comments={23}
            isLiked={true}
            onLikePress={() => onLikePress(comment.id)}
            onCommentPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

export default CommentItem;
