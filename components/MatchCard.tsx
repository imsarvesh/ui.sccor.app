import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Fonts } from "@/constants/Fonts";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

interface MatchCardProps {
  title: string;
  subtitle: string;
  isLive?: boolean;
  id: string;
}

export const MatchCard: React.FC<MatchCardProps> = ({
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

const styles = StyleSheet.create({
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
