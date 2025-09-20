import { Box, HStack } from "@/components/ui";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import StoryItem from "./StoryItem";

interface Story {
  id: number;
  name: string;
  image: string;
}

interface StoriesListProps {
  stories: Story[];
}

const StoriesList: React.FC<StoriesListProps> = ({ stories }) => {
  const backgroundColor = useThemeColor({}, "background");

  const styles = StyleSheet.create({
    storiesContainer: {
      backgroundColor: backgroundColor,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    storiesScroll: {
      flexGrow: 0,
    },
    storiesRow: {
      gap: 20,
    },
  });

  return (
    <Box style={styles.storiesContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storiesScroll}
      >
        <HStack style={styles.storiesRow}>
          {stories.map((story) => (
            <StoryItem
              key={story.id}
              id={story.id}
              name={story.name}
              image={story.image}
            />
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
};

export default StoriesList;
