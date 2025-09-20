import { Box, HStack, Image, Pressable, Text, VStack } from "@/components/ui";
import { PostProvider } from "@/providers/PostProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import PostEngagement from "./PostEngagement";
import Scoreboard from "./Scoreboard";

interface User {
  name: string;
  image: string;
  timeAgo: string;
}

interface ScoreboardData {
  player1: { name: string; scores: number[] };
  player2: { name: string; scores: number[] };
}

interface PostItemProps {
  id: number | string;
  user: User;
  content: string;
  likes: number;
  comments: number;
  type: string;
  image?: string;
  scoreboard?: ScoreboardData;
}

const PostItem = ({ post }: { post: PostItemProps }) => {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleCommentPress = () => {
    router.push(`/comments/${id}`);
  };

  const handleLikePress = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const { id, user, content, comments, type, image, scoreboard } = post;

  return (
    <PostProvider
      initialState={{
        id,
        user,
        content,
        likes,
        comments,
        type,
        image,
        scoreboard,
      }}
    >
      <Box className="bg-background-light dark:bg-background-dark rounded-xl p-4 mb-4 shadow-soft-1">
        {/* Post Header */}
        <HStack className="items-center mb-3">
          <Image
            source={{ uri: user?.image }}
            className="w-14 h-14 rounded-full mr-4"
          />
          <VStack className="flex-1">
            <Text className="text-base font-noto-sans-medium text-typography-black dark:text-typography-white">
              {user?.name}
            </Text>
            <Text className="text-sm font-noto-sans text-typography-gray mt-0.5">
              {user?.timeAgo}
            </Text>
          </VStack>
          <Pressable className="w-7 h-7 justify-center items-center">
            <Ionicons name="ellipsis-horizontal" size={20} color="#9CA3AF" />
          </Pressable>
        </HStack>

        {/* Post Content */}
        <Box className="mb-3">
          <Text className="text-base font-noto-sans text-typography-black dark:text-typography-white leading-6 mb-3">
            {content}
          </Text>

          {type === "image" && image && (
            <Image source={{ uri: image }} className="w-full h-50 rounded-lg" />
          )}

          {type === "scoreboard" && scoreboard && (
            <Scoreboard
              player1={scoreboard?.player1}
              player2={scoreboard?.player2}
            />
          )}
        </Box>

        {/* Post Engagement */}
        <PostEngagement
          likes={likes}
          comments={comments}
          isLiked={isLiked}
          onLikePress={handleLikePress}
          onCommentPress={handleCommentPress}
        />
      </Box>
    </PostProvider>
  );
};

export default PostItem;
