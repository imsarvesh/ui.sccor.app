import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import CommentItem from "./CommentItem";
import { Comment } from "./types";

interface CommentListProps {
  comments: Comment[];
  onLikeComment: (commentId: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onLikeComment,
}) => {
  const styles = StyleSheet.create({
    commentsContainer: {
      flex: 1,
    },
    bottomSpacer: {
      height: 20,
    },
  });

  return (
    <ScrollView style={styles.commentsContainer}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onLikePress={onLikeComment}
        />
      ))}
    </ScrollView>
  );
};

export default CommentList;
