import PostEngagement from "@/components/PostEngagement";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ICommentaryItem {
  id: string;
  bowler: string;
  batsman: string;
  over: string;
  commentary: string;
  likes: number;
  replies: number;
}

const commentaryData: ICommentaryItem[] = [
  {
    id: "1",
    bowler: "Liam",
    batsman: "Ethan",
    over: "Over 19.6",
    commentary:
      "Liam bowls a full toss, Ethan hits it for a boundary! 4 runs added to the total.",
    likes: 23,
    replies: 5,
  },
  {
    id: "2",
    bowler: "Liam",
    batsman: "Ethan",
    over: "Over 19.5",
    commentary: "Liam bowls a yorker, Ethan defends it. No runs.",
    likes: 15,
    replies: 2,
  },
  {
    id: "3",
    bowler: "Liam",
    batsman: "Ethan",
    over: "Over 19.4",
    commentary: "Liam bowls a bouncer, Ethan ducks. No runs.",
    likes: 18,
    replies: 3,
  },
  {
    id: "4",
    bowler: "Liam",
    batsman: "Ethan",
    over: "Over 19.3",
    commentary:
      "Liam bowls a slower ball, Ethan hits it for a single. 1 run added.",
    likes: 20,
    replies: 4,
  },
  {
    id: "5",
    bowler: "Liam",
    batsman: "Ethan",
    over: "Over 19.2",
    commentary:
      "Liam bowls a full length, Ethan hits it straight to the fielder. No runs.",
    likes: 12,
    replies: 1,
  },
  {
    id: "6",
    bowler: "Liam",
    batsman: "Ethan",
    over: "Over 19.1",
    commentary: "Liam bowls a wide delivery, Ethan leaves it. 1 extra run.",
    likes: 10,
    replies: 0,
  },
];

const CommentaryItem: React.FC<{ item: ICommentaryItem }> = ({ item }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View className="mb-2">
      <View
        className="px-4 py-2 justify-center"
        style={{ backgroundColor: colors.backgroundSecondary }}
      >
        <View className="flex-col justify-center">
          <ThemedText
            className="text-sm font-normal"
            style={{ color: colors.secondaryText }}
          >
            {item.over}
          </ThemedText>
        </View>
      </View>

      <ThemedText className="text-base font-normal px-4 pt-1 pb-3 leading-6">
        {item.commentary}
      </ThemedText>
      <View className="px-4">
        <PostEngagement
          likes={item.likes}
          comments={item.replies}
          isLiked={true}
          onLikePress={() => {}}
          onCommentPress={() => {}}
        />
      </View>
    </View>
  );
};

export default function CommentaryScreen() {
  return commentaryData.map((item) => (
    <CommentaryItem key={item.id} item={item} />
  ));
}
