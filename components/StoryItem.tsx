import React from "react";
import { Image, Text, VStack } from "@/components/ui";

interface StoryItemProps {
  id: number;
  name: string;
  image: string;
}

const StoryItem: React.FC<StoryItemProps> = ({ name, image }) => {
  return (
    <VStack className="items-center w-16">
      <Image
        source={{ uri: image }}
        className="w-16 h-16 rounded-full mb-2"
        alt={`${name} story`}
      />
      <Text className="text-xs font-noto-sans text-center text-typography-black dark:text-typography-white">
        {name}
      </Text>
    </VStack>
  );
};

export default StoryItem;
