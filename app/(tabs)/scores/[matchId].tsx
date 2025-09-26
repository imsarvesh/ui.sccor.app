import Header from "@/components/Header";
import { Box, HStack, Pressable, Text, VStack } from "@/components/ui";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "@/components/ui";
import Commentary from "./Commentary";
import { router, useLocalSearchParams } from "expo-router";
import { usePostById } from "@/service/hooks/usePost";
import { Match } from "@/graphql/types/graphql";

type TabType = "scoreboard" | "commentary" | "summary";

const mockData = {
  tournament: "T20 World Cup",
  team1: "India",
  team2: "Australia",
  team1Score: "185/5",
  team2Score: "150/10",
  team1Overs: "20.0",
  team2Overs: "18.3",
  result: "India won by 35 runs",
  isLive: true,
};

export default function MatchDetailsScreen() {
  const { matchId } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("scoreboard");

  const { loading, data } = usePostById(matchId as string);
  // @ts-ignore
  const match = data?.post.data as Match;

  if (loading) {
    return <ActivityIndicator />;
  }

  const renderScoreboard = () => (
    <VStack className="px-4 py-6 gap-4">
      <TouchableOpacity onPress={() => router.push(`/scores/scorecard`)}>
        <Text className="text-typography-900 dark:text-typography-0 text-base font-medium">
          Scoreboard click
        </Text>
      </TouchableOpacity>
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
      <Header title={match.name} isBack={true} isSearch={false} />

      <Box className="rounded-lg border border-outline-200 dark:border-outline-700 p-5 m-5">
        <HStack className="items-center justify-between mb-4">
          <VStack className="w-2/3">
            <Text className="text-sm text-typography-600 dark:text-typography-400">
              {match.tournament?.name}
            </Text>
            <Text className="text-xl font-bold text-typography-900 dark:text-typography-0 line-clamp-2">
              {match.name}
            </Text>
          </VStack>
          {mockData.isLive && (
            <Box className="rounded-full border border-typography-900 dark:border-typography-0 px-3 py-1">
              <Text className="text-xs font-semibold uppercase tracking-wider text-typography-900 dark:text-typography-0">
                Live
              </Text>
            </Box>
          )}
        </HStack>

        {/* Score Display */}
        <VStack className="justify-between px-6">
          {match.teams?.map((team) => (
            <HStack className="items-center gap-3 justify-between">
              <Text className="text-xl font-bold text-typography-900 dark:text-typography-0">
                {mockData.team1.substring(0, 3).toUpperCase()}
              </Text>
              <Text className="text-3xl font-bold text-typography-900 dark:text-typography-0">
                {mockData.team1Score}
                <Text className="text-lg font-normal text-typography-600 dark:text-typography-400">
                  {" "}
                  ({mockData.team1Overs})
                </Text>
              </Text>
            </HStack>
          ))}
        </VStack>

        <VStack className="justify-between px-6">
          <HStack className="items-center gap-3 justify-between">
            <Text className="text-xl font-bold text-typography-900 dark:text-typography-0">
              {mockData.team1.substring(0, 3).toUpperCase()}
            </Text>
            <Text className="text-3xl font-bold text-typography-900 dark:text-typography-0">
              {mockData.team1Score}
              <Text className="text-lg font-normal text-typography-600 dark:text-typography-400">
                {" "}
                ({mockData.team1Overs})
              </Text>
            </Text>
          </HStack>
          <HStack className="items-center gap-3 justify-between">
            <Text className="text-xl font-bold text-typography-900 dark:text-typography-0">
              {mockData.team2.substring(0, 3).toUpperCase()}
            </Text>
            <Text className="text-3xl font-bold text-typography-600 dark:text-typography-400">
              {mockData.team2Score}{" "}
              <Text className="text-lg font-normal">
                ({mockData.team2Overs})
              </Text>
            </Text>
          </HStack>
        </VStack>

        {/* Result */}
        <Text className="mt-4 text-base font-medium text-typography-900 dark:text-typography-0">
          {mockData.result}
        </Text>
      </Box>

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
