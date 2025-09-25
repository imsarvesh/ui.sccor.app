import { Box } from "@/components/ui";
import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";
import { PostProvider } from "@/providers/PostProvider";
import React from "react";
import { StyleSheet } from "react-native";
import PostComponent from "./Post";
import PostActions from "./PostActions";
import { Post } from "@/graphql/types/graphql";

const PostItem = ({ post }: { post: Post }) => {
  const textColor = useThemeColor({}, "text");
  const secondaryTextColor = useThemeColor(
    { light: "#9c4949", dark: "#a0a0a0" },
    "text"
  );

  const styles = StyleSheet.create({
    post: {
      padding: 16,
      marginBottom: 16,
    },
    postHeader: {
      alignItems: "center",
      marginBottom: 12,
    },
    postUserImage: {
      width: 56,
      height: 56,
      borderRadius: 28,
      marginRight: 16,
    },
    postUserInfo: {
      flex: 1,
    },
    postUserName: {
      fontSize: 16,
      fontFamily: Fonts.notoSans.medium,
      color: textColor,
    },
    postTimeAgo: {
      fontSize: 14,
      fontFamily: Fonts.notoSans.regular,
      color: secondaryTextColor,
      marginTop: 2,
    },
    postActionButton: {
      width: 28,
      height: 28,
      justifyContent: "center",
      alignItems: "center",
    },
    postContent: {
      marginBottom: 12,
    },
    postText: {
      fontSize: 16,
      fontFamily: Fonts.notoSans.regular,
      color: textColor,
      lineHeight: 24,
      marginBottom: 12,
    },
    postImage: {
      width: "100%",
      height: 200,
      borderRadius: 8,
    },
  });

  return (
    <PostProvider initialState={{ ...post }}>
      <Box style={styles.post}>
        {/* Post Content */}
        <PostComponent />

        {/* Post Engagement */}
        <PostActions />
      </Box>
    </PostProvider>
  );
};

export default PostItem;
