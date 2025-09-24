import { Header } from "@/components";
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

interface MatchCardProps {
  title: string;
  subtitle: string;
  isLive?: boolean;
  id: string;
}

const MatchCard: React.FC<MatchCardProps> = ({
  title,
  subtitle,
  isLive = false,
  id,
}) => {
  const backgroundColor = useThemeColor({}, "backgroundSecondary");
  const textColor = useThemeColor({}, "primaryText");
  const secondaryTextColor = useThemeColor({}, "secondaryText");
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`/scores/${id}`)}>
      <Box style={[styles.matchCard, { backgroundColor }]}>
        <VStack style={styles.matchCardContent}>
          <VStack style={styles.matchInfo}>
            {isLive && (
              <Text style={[styles.liveText, { color: "red" }]}>Live</Text>
            )}
            <Text style={[styles.matchTitle, { color: textColor }]}>
              {title}
            </Text>
            <Text style={[styles.matchSubtitle, { color: secondaryTextColor }]}>
              {subtitle}
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default function ScoresScreen() {
  const backgroundColor = useThemeColor({}, "backgroundPrimary");
  const { recentMatch, isLoading, categories } = useRecentMatch();
  const [activeTab, setActiveTab] = useState<string>("");

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const filteredRecentMatch = recentMatch[activeTab || categories[0]];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header title="Scores" isBack={false} />
      <Box style={[styles.container, { backgroundColor }]}>
        {!isEmpty(categories) ? (
          <Tabs
            categories={categories}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ) : null}

        {/* Horizontal Navigation Bar */}
        <HorizontalNavBar />

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

const HorizontalNavBar = () => {
  const backgroundColor = useThemeColor({}, "backgroundSecondary");
  const textColor = useThemeColor({}, "primaryText");
  const [selectedDate, setSelectedDate] = useState("Today");

  return (
    <Box style={[styles.navBar, { backgroundColor }]}>
      <HStack
        style={styles.navBarContent}
        className="items-center justify-between px-4"
      >
        {/* LIVE Button */}
        <Pressable style={styles.liveButton}>
          <Text style={styles.liveButtonText}>LIVE</Text>
        </Pressable>

        {/* Navigation Arrows and Today */}
        <HStack style={styles.navCenter} className="items-center gap-4">
          <Pressable style={styles.navArrow}>
            <IconSymbol name="chevron.left" size={20} color={textColor} />
          </Pressable>

          <Text style={[styles.todayText, { color: textColor }]}>
            {selectedDate}
          </Text>

          <Pressable style={styles.navArrow}>
            <IconSymbol name="chevron.right" size={20} color={textColor} />
          </Pressable>
        </HStack>

        {/* Calendar Button */}
        <Pressable style={styles.calendarButton}>
          <IconSymbol name="calendar.days" size={20} color={textColor} />
        </Pressable>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
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
  matchCard: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  matchCardContent: {
    alignItems: "stretch",
  },
  matchInfo: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 4,
  },
  liveText: {
    fontSize: 14,
    fontFamily: Fonts.lexend.regular,
    marginBottom: 4,
  },
  matchTitle: {
    fontSize: 18,
    fontFamily: Fonts.lexend.bold,
    lineHeight: 22,
    marginBottom: 4,
  },
  matchSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.lexend.regular,
    lineHeight: 20,
  },
  // Navigation Bar Styles
  navBar: {
    height: 60,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 30,
    justifyContent: "center",
  },
  navBarContent: {
    height: "100%",
    alignItems: "center",
  },
  liveButton: {
    backgroundColor: "#374151", // Dark gray background
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  liveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: Fonts.lexend.bold,
    fontWeight: "700",
    textShadowColor: "rgba(255, 255, 255, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  navCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navArrow: {
    padding: 8,
  },
  todayText: {
    fontSize: 16,
    fontFamily: Fonts.lexend.bold,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  calendarButton: {
    backgroundColor: "#374151", // Dark gray background
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
