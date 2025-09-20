import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TrendingTopicsProps {
  topics: string[];
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ topics }) => {
  const tertiary = useThemeColor({}, "backgroundSecondary");
  const primary = useThemeColor({}, "primaryText");

  return (
    <View className="px-4 py-2">
      <ThemedText className="text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
        Trending topics
      </ThemedText>
      <View className="flex-row flex-wrap gap-2">
        {topics.map((topic) => (
          <TouchableOpacity
            key={topic}
            className="px-4 py-2 rounded-full mr-3"
            style={{ backgroundColor: tertiary }}
          >
            <Text className="text-sm font-medium" style={{ color: primary }}>
              {topic}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TrendingTopics;
