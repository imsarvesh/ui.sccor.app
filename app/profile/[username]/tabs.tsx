import { Box, HStack, Pressable, VStack } from "@/components/ui";
import { Text } from "react-native";
import React from "react";

const Tabs = ({
  categories,
  activeTab,
  onTabChange,
}: {
  categories: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}) => {
  activeTab = activeTab || categories[0];

  return (
    <Box>
      <HStack className="px-4 dark:border-outline-700 gap-8">
        {categories.map((tab: string) => (
          <Pressable
            key={tab}
            onPress={() => onTabChange(tab)}
            className="flex py-4"
          >
            <VStack className="items-center gap-1">
              <Text
                className={`text-sm font-bold px-4 ${
                  activeTab === tab
                    ? "text-typography-900 dark:text-typography-0"
                    : "text-typography-600 dark:text-typography-400"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
              <Box
                className={`h-0.5 w-full ${
                  activeTab === tab ? "bg-primary-500" : "bg-transparent"
                }`}
              />
            </VStack>
          </Pressable>
        ))}
      </HStack>
    </Box>
  );
};

export default Tabs;
