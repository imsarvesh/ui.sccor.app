import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Box, HStack, Text, VStack } from "@/components/ui";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Header } from "@/components";

interface ScoreCardProps {
  matchData?: {
    tournament: string;
    team1: string;
    team2: string;
    team1Score: string;
    team2Score: string;
    team1Overs: string;
    team2Overs: string;
    result: string;
    isLive: boolean;
    recentOvers: string[];
    batting: Array<{
      name: string;
      runs: number;
      balls: number;
      fours: number;
      sixes: number;
      isNotOut: boolean;
    }>;
    bowling: Array<{
      name: string;
      overs: string;
      runs: number;
      wickets: number;
      economy: number;
    }>;
  };
}

export default function ScoreCard({ matchData }: ScoreCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Default data for demonstration
  const defaultData = {
    tournament: "T20 World Cup",
    team1: "India",
    team2: "Australia",
    team1Score: "185/5",
    team2Score: "150/10",
    team1Overs: "20.0",
    team2Overs: "18.3",
    result: "India won by 35 runs",
    isLive: true,
    recentOvers: ["6", "4", "W", "1", "0", "2"],
    batting: [
      {
        name: "Rohit Sharma",
        runs: 45,
        balls: 30,
        fours: 4,
        sixes: 2,
        isNotOut: true,
      },
      {
        name: "Virat Kohli",
        runs: 60,
        balls: 40,
        fours: 6,
        sixes: 3,
        isNotOut: false,
      },
    ],
    bowling: [
      {
        name: "Jasprit Bumrah",
        overs: "4.0",
        runs: 25,
        wickets: 3,
        economy: 6.25,
      },
      {
        name: "Pat Cummins",
        overs: "3.3",
        runs: 30,
        wickets: 2,
        economy: 8.57,
      },
    ],
  };

  const data = matchData || defaultData;

  const BallIndicator = ({
    ball,
    isWicket,
  }: {
    ball: string;
    isWicket: boolean;
  }) => (
    <Box
      className={`h-9 w-9 items-center justify-center rounded-full border ${
        isWicket
          ? "bg-typography-900 dark:bg-typography-0 border-typography-900 dark:border-typography-0"
          : "border-outline-200 dark:border-outline-700"
      }`}
    >
      <Text
        className={`font-bold ${
          isWicket
            ? "text-background-0 dark:text-background-950"
            : "text-typography-900 dark:text-typography-0"
        }`}
      >
        {ball}
      </Text>
    </Box>
  );

  return (
    <SafeAreaView
      className="bg-background-0 dark:bg-background-950 flex-1"
      edges={["top", "left", "right"]}
    >
      <Header title="Scorecard" isBack={true} isSearch={false} />
      <ScrollView className="flex-1 bg-background-0 dark:bg-background-950">
        <VStack className="p-6 gap-8">
          {/* Match Header */}
          <Box className="rounded-lg border border-outline-200 dark:border-outline-700 p-5">
            <HStack className="items-center justify-between mb-4">
              <VStack>
                <Text className="text-sm text-typography-600 dark:text-typography-400">
                  {data.tournament}
                </Text>
                <Text className="text-xl font-bold text-typography-900 dark:text-typography-0">
                  {data.team1} vs {data.team2}
                </Text>
              </VStack>
              {data.isLive && (
                <Box className="rounded-full border border-typography-900 dark:border-typography-0 px-3 py-1">
                  <Text className="text-xs font-semibold uppercase tracking-wider text-typography-900 dark:text-typography-0">
                    Live
                  </Text>
                </Box>
              )}
            </HStack>

            {/* Score Display */}
            <HStack className="justify-between">
              <VStack>
                <Text className="text-xl font-bold text-typography-900 dark:text-typography-0">
                  {data.team1.substring(0, 3).toUpperCase()}
                </Text>
                <Text className="text-3xl font-bold text-typography-900 dark:text-typography-0">
                  {data.team1Score}
                  <Text className="text-lg font-normal text-typography-600 dark:text-typography-400">
                    {" "}
                    ({data.team1Overs})
                  </Text>
                </Text>
              </VStack>
              <Text className="text-3xl font-light text-typography-600 dark:text-typography-400">
                vs
              </Text>
              <VStack className="items-end">
                <Text className="text-xl font-bold text-typography-900 dark:text-typography-0">
                  {data.team2.substring(0, 3).toUpperCase()}
                </Text>
                <Text className="text-3xl font-bold text-typography-600 dark:text-typography-400">
                  {data.team2Score}{" "}
                  <Text className="text-lg font-normal">
                    ({data.team2Overs})
                  </Text>
                </Text>
              </VStack>
            </HStack>

            {/* Result */}
            <Text className="mt-4 text-center text-base font-medium text-typography-900 dark:text-typography-0">
              {data.result}
            </Text>
          </Box>

          {/* Recent Overs */}
          <VStack className="gap-4">
            <Text className="text-base font-semibold uppercase tracking-wider text-typography-600 dark:text-typography-400">
              Recent Overs
            </Text>
            <HStack className="justify-center gap-2">
              {data.recentOvers.map((ball, index) => (
                <BallIndicator
                  key={index}
                  ball={ball}
                  isWicket={ball === "W"}
                />
              ))}
            </HStack>
          </VStack>

          {/* Batting Section */}
          <VStack className="gap-4">
            <Text className="text-base font-semibold uppercase tracking-wider text-typography-600 dark:text-typography-400">
              Batting
            </Text>

            {/* Batting Header */}
            <HStack className="grid-cols-4 gap-4">
              <Box className="flex-2">
                <Text className="text-sm font-semibold text-typography-900 dark:text-typography-0">
                  Batter
                </Text>
              </Box>
              <Box className="flex-1">
                <Text className="text-center text-sm font-medium text-typography-600 dark:text-typography-400">
                  R (B)
                </Text>
              </Box>
              <Box className="flex-1">
                <Text className="text-center text-sm font-medium text-typography-600 dark:text-typography-400">
                  4s
                </Text>
              </Box>
              <Box className="flex-1">
                <Text className="text-center text-sm font-medium text-typography-600 dark:text-typography-400">
                  6s
                </Text>
              </Box>
            </HStack>

            {/* Batting Rows */}
            {data.batting.map((batter, index) => (
              <Box
                key={index}
                className="border-t border-outline-200 dark:border-outline-700 pt-4"
              >
                <HStack className="gap-4">
                  <Box className="flex-2">
                    <Text className="font-semibold text-typography-900 dark:text-typography-0">
                      {batter.name}
                      {batter.isNotOut && (
                        <Text className="text-typography-600 dark:text-typography-400">
                          *
                        </Text>
                      )}
                    </Text>
                  </Box>
                  <Box className="flex-1">
                    <Text className="text-center font-bold text-typography-900 dark:text-typography-0">
                      {batter.runs}
                      <Text className="font-normal text-typography-600 dark:text-typography-400">
                        {" "}
                        ({batter.balls})
                      </Text>
                    </Text>
                  </Box>
                  <Box className="flex-1">
                    <Text className="text-center font-bold text-typography-900 dark:text-typography-0">
                      {batter.fours}
                    </Text>
                  </Box>
                  <Box className="flex-1">
                    <Text className="text-center font-bold text-typography-900 dark:text-typography-0">
                      {batter.sixes}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            ))}
          </VStack>

          {/* Bowling Section */}
          <VStack className="gap-4">
            <Text className="text-base font-semibold uppercase tracking-wider text-typography-600 dark:text-typography-400">
              Bowling
            </Text>

            {/* Bowling Header */}
            <HStack className="gap-4">
              <Box className="flex-2">
                <Text className="text-sm font-semibold text-typography-900 dark:text-typography-0">
                  Bowler
                </Text>
              </Box>
              <Box className="flex-1">
                <Text className="text-center text-sm font-medium text-typography-600 dark:text-typography-400">
                  O
                </Text>
              </Box>
              <Box className="flex-1">
                <Text className="text-center text-sm font-medium text-typography-600 dark:text-typography-400">
                  R
                </Text>
              </Box>
              <Box className="flex-1">
                <Text className="text-center text-sm font-medium text-typography-600 dark:text-typography-400">
                  W
                </Text>
              </Box>
              <Box className="flex-1">
                <Text className="text-center text-sm font-medium text-typography-600 dark:text-typography-400">
                  ER
                </Text>
              </Box>
            </HStack>

            {/* Bowling Rows */}
            {data.bowling.map((bowler, index) => (
              <Box
                key={index}
                className="border-t border-outline-200 dark:border-outline-700 pt-4"
              >
                <HStack className="gap-4">
                  <Box className="flex-2">
                    <Text className="font-semibold text-typography-900 dark:text-typography-0">
                      {bowler.name}
                    </Text>
                  </Box>
                  <Box className="flex-1">
                    <Text className="text-center font-bold text-typography-900 dark:text-typography-0">
                      {bowler.overs}
                    </Text>
                  </Box>
                  <Box className="flex-1">
                    <Text className="text-center font-bold text-typography-900 dark:text-typography-0">
                      {bowler.runs}
                    </Text>
                  </Box>
                  <Box className="flex-1">
                    <Text className="text-center font-bold text-typography-900 dark:text-typography-0">
                      {bowler.wickets}
                    </Text>
                  </Box>
                  <Box className="flex-1">
                    <Text className="text-center font-bold text-typography-900 dark:text-typography-0">
                      {bowler.economy}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
