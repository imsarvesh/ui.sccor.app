import { Header } from "@/components";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "../../../components/ui";

interface MatchCardProps {
  title: string;
  subtitle: string;
  isLive?: boolean;
}

const MatchCard: React.FC<MatchCardProps> = ({
  title,
  subtitle,
  isLive = false,
}) => {
  const backgroundColor = useThemeColor({}, "backgroundSecondary");
  const textColor = useThemeColor({}, "primaryText");
  const secondaryTextColor = useThemeColor({}, "secondaryText");
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push("/scores/details")}>
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
  const textColor = useThemeColor({}, "primaryText");
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Header title="Scores" isBack={false} />
      <Box style={[styles.container, { backgroundColor }]}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Box style={styles.sectionContainer}>
            <MatchCard
              title="India vs. Australia"
              subtitle="India: 250/5 (45 overs) Australia: 180/7 (38 overs)"
              isLive={true}
            />
          </Box>

          {/* Upcoming Section */}
          <Pressable onPress={() => router.push("/scores/upcoming")}>
            <HStack style={styles.sectionTitleContainer}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>
                Upcoming
              </Text>
              <Icon name="chevron-right" size={24} color={textColor} />
            </HStack>
          </Pressable>

          <Box style={styles.sectionContainer}>
            <MatchCard
              title="England vs. South Africa"
              subtitle="Tomorrow, 10:00 AM"
            />
          </Box>

          <Box style={styles.sectionContainer}>
            <MatchCard
              title="New Zealand vs. Pakistan"
              subtitle="Next Week, 2:00 PM"
            />
          </Box>

          {/* Recent Results Section */}
          <Pressable onPress={() => router.push("/scores/recent")}>
            <HStack style={styles.sectionTitleContainer}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>
                Recent Results
              </Text>
              <Icon name="chevron-right" size={24} color={textColor} />
            </HStack>
          </Pressable>

          <Box style={styles.sectionContainer}>
            <MatchCard
              title="West Indies vs. Sri Lanka"
              subtitle="West Indies won by 6 wickets"
            />
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}

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
});
