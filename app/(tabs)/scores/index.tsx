import { Header, HorizontalNavBar, MatchCard } from "@/components";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "../../../components/ui";
import useRecentMatch, {
  IRecentMatchBySportType,
} from "@/service/hooks/useRecentMatch";
import { isEmpty } from "lodash";
import { Match, Post } from "@/graphql/types/graphql";
import { timeAgo } from "@/service/utils/timeAgo";

export default function ScoresScreen() {
  const backgroundColor = useThemeColor({}, "backgroundPrimary");
  const { recentMatch, isLoading, categories } = useRecentMatch();
  const [activeTab, setActiveTab] = useState<string>("");
  const [selectedSport, setSelectedSport] = useState<string>("All");

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const filteredRecentMatch = recentMatch[activeTab || categories[0]];

  const handleSportSelect = (sport: string) => {
    setSelectedSport(sport);
    // You can add logic here to filter matches by sport
    console.log("Selected sport:", sport);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* <Header title="Match" isBack={false} /> */}
      <Box style={[styles.container, { backgroundColor }]}>
        {/* {!isEmpty(categories) ? (
          <Tabs
            categories={categories}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ) : null} */}

        {/* Horizontal Navigation Bar */}
        <HorizontalNavBar
          selectedSport={selectedSport}
          onSportSelect={handleSportSelect}
        />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <LiveContent posts={filteredRecentMatch?.["live"]} />
          <UpcomingContent posts={filteredRecentMatch?.["upcoming"]} />
          <RecentContent posts={filteredRecentMatch?.["completed"]} />
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}

const Tabs = ({
  categories,
  activeTab,
  setActiveTab,
}: {
  categories: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  activeTab = activeTab || categories[0];

  return (
    <Box>
      <HStack className="px-4 dark:border-outline-700 gap-8">
        {categories.map((tab: string) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
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

const LiveContent = ({ posts }: { posts: Post[] }) => {
  return posts?.map((post) => (
    <Box style={styles.sectionContainer} key={post.id}>
      <MatchCard
        id={post.id}
        title="India vs. Australia"
        subtitle="India: 250/5 (45 overs) Australia: 180/7 (38 overs)"
        isLive={true}
      />
    </Box>
  ));
};

const UpcomingContent = ({ posts }: { posts: Post[] }) => {
  const textColor = useThemeColor({}, "primaryText");
  const router = useRouter();

  return (
    <>
      {/* Upcoming Section */}
      <Pressable onPress={() => router.push("/scores/upcoming")}>
        <HStack style={styles.sectionTitleContainer}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Upcoming
          </Text>
          <IconSymbol name="chevron.right" size={24} color={textColor} />
        </HStack>
      </Pressable>

      {posts?.map((post) => (
        <Box style={styles.sectionContainer} key={post.id}>
          <MatchCard
            title={(post.data as Match)?.name}
            id={post.id}
            subtitle={timeAgo(new Date(+(post.data as Match).startAt))}
          />
        </Box>
      ))}
    </>
  );
};

const RecentContent = ({ posts }: { posts: Post[] }) => {
  const router = useRouter();
  const textColor = useThemeColor({}, "primaryText");

  return (
    <>
      {/* Recent Results Section */}
      <Pressable onPress={() => router.push("/scores/recent")}>
        <HStack style={styles.sectionTitleContainer}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Recent Results
          </Text>
          <IconSymbol name="chevron.right" size={24} color={textColor} />
        </HStack>
      </Pressable>

      {posts?.map((post) => (
        <Box style={styles.sectionContainer} key={post.id}>
          <MatchCard
            title={(post.data as Match)?.name}
            id={post.id}
            subtitle={(post.data as Match)?.status}
          />
        </Box>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 22,
    fontFamily: Fonts.lexend.bold,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 20,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  sectionContainer: {
    paddingHorizontal: 16,
  },
});
