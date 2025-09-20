import Header from "@/components/Header";
import { Box, HStack, Pressable, Text, VStack } from "@/components/ui";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "../../../components/ui";
import Commentary from "./Commentary";

type TabType = "scoreboard" | "commentary" | "summary";

export default function MatchDetailsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("scoreboard");

  const renderScoreboard = () => (
    <VStack className="px-4 py-6 gap-4">
      <Text className="text-typography-900 dark:text-typography-0 text-base font-medium">
        Scoreboard
      </Text>
      <Text className="text-typography-600 dark:text-typography-400 text-base">
        Scoreboard content will be displayed here
      </Text>
    </VStack>
  );

  const renderMatchSummary = () => (
    <VStack className="px-4 py-6 gap-4">
      <Text className="text-typography-900 dark:text-typography-0 text-base font-medium">
        Match Summary
      </Text>
      <Text className="text-typography-600 dark:text-typography-400 text-base">
        Match summary content will be displayed here
      </Text>
    </VStack>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "scoreboard":
        return renderScoreboard();
      case "commentary":
        return <Commentary />;
      case "summary":
        return renderMatchSummary();
      default:
        return renderScoreboard();
    }
  };

  return (
    <SafeAreaView
      className="bg-background-0 dark:bg-background-950 flex-1"
      edges={["top", "left", "right"]}
    >
      {/* Header */}
      <Header title="Match Result" isBack={true} isSearch={false} />

      {/* Final Score Section */}
      <VStack className="px-4 gap-2">
        <Text className="text-typography-900 dark:text-typography-0 text-3xl font-bold text-center pt-6">
          2 - 1
        </Text>
        <Text className="text-typography-900 dark:text-typography-0 text-base text-center pt-1">
          Team A vs. Team B
        </Text>
        <Text className="text-typography-600 dark:text-typography-400 text-sm text-center pt-1">
          July 22, 2024 · 7:00 PM · Stadium X
        </Text>
      </VStack>

      {/* Tabs */}
      <Box className="pb-3">
        <HStack className="px-4 dark:border-outline-700 gap-8">
          {[
            { id: "scoreboard", label: "Scoreboard" },
            { id: "commentary", label: "Commentary" },
            { id: "summary", label: "Summary" },
          ].map((tab) => (
            <Pressable
              key={tab.id}
              onPress={() => setActiveTab(tab.id as TabType)}
              className="flex-1 py-4"
            >
              <VStack className="items-center gap-1">
                <Text
                  className={`text-sm font-bold ${
                    activeTab === tab.id
                      ? "text-typography-900 dark:text-typography-0"
                      : "text-typography-600 dark:text-typography-400"
                  }`}
                >
                  {tab.label}
                </Text>
                <Box
                  className={`h-0.5 w-full ${
                    activeTab === tab.id ? "bg-primary-500" : "bg-transparent"
                  }`}
                />
              </VStack>
            </Pressable>
          ))}
        </HStack>
      </Box>

      {/* Tab Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>

      {/* Bottom Spacing */}
      <Box className="h-20 bg-background-0 dark:bg-background-950" />
    </SafeAreaView>
  );
}
