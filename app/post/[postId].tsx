import { CommentList, Header } from "@/components";
import { Comment } from "@/components/types";
import React, { useState } from "react";
import { SafeAreaView } from "../../components/ui";
import { usePostById } from "@/service/hooks/usePost";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text } from "react-native";
import PostItem from "@/components/Post";
import { useThemeColor } from "@/hooks/useThemeColor";

const mockComments: Comment[] = [
  {
    id: "1",
    user: {
      name: "Alex",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB-tMIL9GAM79sIKjiLX1XU4-yUZMxDb-QUKCboVg4dCoYLv-Oklz4HGUosZQoWrlnp9rVislq8Qb4iYcDDFB1ra_-J3RkCvzsplPK-008SDsaMXImBHaSZIOt3PWq5rP4fjO_1rmif8O2lZtBeupyz2ApKHZWWcRMBXePW5VxtP3C0aerWg0bnX0lQB-rj5kNa4jkDTlum1eR92jwgrrZ5GzkoJmOyPqzCVtL_CwgR-dmJgahFDPyx9NCmTFmjPse7_5Fu-k25Y2A",
    },
    text: "This is an incredible achievement! Your dedication and hard work truly paid off. Congratulations on this well-deserved success!",
    timestamp: "2d",
    likes: 12,
  },
  {
    id: "2",
    user: {
      name: "Sophia",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAMKKPmUJXaSxPf9d3ri7av8DnCn7KKwtyd1vkY427R1X-WVuQm7JsJaMmwAfSA1dC7LGyXqNYKRekgBcFegNIGnH-hgRxQwsd5h2tMh3MTL67neFa9s4HKw-B8JiOEhQ_yGSvM4calBZmn9us9mRPsqQpyazhyYhDlcjn5zzi5Th2cejuH9FGQPWRLFDW-UMsdN6zV9UYEm5RwyFEaH-LpZeNoDu_NOT-tPvb8DbvweLehwzI1lJNI7n7TbVT7V7dXe8JiaC1pHYo",
    },
    text: "Absolutely amazing! You're an inspiration to us all. Keep pushing boundaries and achieving greatness!",
    timestamp: "1d",
    likes: 8,
  },
  {
    id: "3",
    user: {
      name: "Ethan",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAkcu5qf7rW8IAfd4Rl861l5thXhO_AulsvpVYiPlMi-4SKE0O5Kap87MV7Yc29raI4aI8lR5blkh90E1SmhYYLGpN5Ugt24tLPCEauxAxFmKIPlAOyJfHDL5-V9Bh3fKpP1xkGS46ncSYW88eYKKOdGtDIaCNhzBe-Pi0G8kNWopv0fJhRSi6VBKIKilAjt_WEKTxjhj1whWc5jDcuZVx0VH3Wc4xiUVGAEGxg13We1RcZQ1rGmwV8eUomnWYsCHznAq_bExoMwZQ",
    },
    text: "Such a remarkable performance! Your perseverance and skill are truly commendable. Wishing you even more success in your future endeavors.",
    timestamp: "1d",
    likes: 15,
  },
  {
    id: "4",
    user: {
      name: "Olivia",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBTniJ_-tDy7qWeQPyDBT6afCyNq1Zvd84jL1OlDfustVNMYqQ_nZgSa3ssKUmlCKiKAP3Zd9CfqnmpcX51FLrlEtg39eyYnTIfJ1paeLzOyy0ArJ4qyw1UziW13tF_lvgDFDFWu7QKDwrJ0-5RoKNe6dGMGi-q_8V-jQi-813D8DFPbiPKTQpDSSrf_2eb8FuPNbujnS9OwRjTz6mAplFXvMt3b7k-YkukQeTQVgmCnojwI16ldraaUcSIkcIi9Y6CHheiyYK3Vd0",
    },
    text: "This is beyond impressive! Your passion and commitment shine through in every move. Congratulations on this outstanding accomplishment!",
    timestamp: "12h",
    likes: 20,
  },
  {
    id: 5,
    user: {
      name: "Liam",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBpkNVMz-WKQyTs2EK3fy9Y5rEFEnYeSpjUHG_5KCmiRkNlhXCtB04g6kQPwRRMeojtJtAbF3mKCkwmy8dzjdKbm74wR4sTDBOHwwhQmxIis_6QWlf02Xl9z3NzKetoTtOwY2nJxugVze7eQlYI1S9oKds9PdUoMakpesECoM88-KZMz4_ceZaYT_LzTpXE7-UT4XOu8U_MUjFc4MDYS1mEdvjhm_3WimgKv6hcSWUwIqaeeekc5t6pailawCFfY93KF9sGZvLofDY",
    },
    text: "Incredible work! Your talent and determination are truly inspiring. Keep up the fantastic work and continue to reach for the stars!",
    timestamp: "10h",
    likes: 10,
  },
];

const PostComponent = () => {
  const { postId } = useLocalSearchParams();
  const { loading, data } = usePostById(postId as string);
  const [comments, setComments] = useState<Comment[]>(mockComments);

  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");

  if (loading) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor }}>
        <ActivityIndicator color={tintColor} size="large" />
      </SafeAreaView>
    );
  }

  console.log(data);

  const handleLikeComment = (commentId: string | number) => {
    setComments(
      comments.map((comment: Comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  // Map GraphQL Post to PostItemProps format
  const mappedPost = data
    ? {
        id: parseInt(data.id),
        user: {
          name: data.profile?.name || "Unknown User",
          image: data.profile?.image || "",
          timeAgo: "1d", // You might want to calculate this from createdAt
        },
        content:
          data.data?.__typename === "News" ? (data.data as any).text || "" : "",
        likes: data.likes,
        comments: data.repliesCount,
        type: data.data?.__typename?.toLowerCase() || "post",
        image: data.media?.[0]?.fileUrl,
        scoreboard: undefined, // Add scoreboard mapping if needed
      }
    : null;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <Header
        title={data.post.data?.__typename}
        isBack={true}
        isSearch={false}
      />
      {mappedPost && <PostItem post={mappedPost} />}
      <CommentList comments={comments} onLikeComment={handleLikeComment} />
    </SafeAreaView>
  );
};

export default PostComponent;
