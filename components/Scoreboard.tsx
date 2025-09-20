import React from "react";
import { Box, HStack, Text } from "@/components/ui";
import { StyleSheet } from "react-native";
import { Fonts } from "../constants/Fonts";
import { useThemeColor } from "../hooks/useThemeColor";

interface Player {
  name: string;
  scores: number[];
}

interface ScoreboardProps {
  player1: Player;
  player2: Player;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ player1, player2 }) => {
  const textColor = useThemeColor({}, "text");
  const secondaryTextColor = useThemeColor(
    { light: "#9c4949", dark: "#a0a0a0" },
    "text"
  );
  const borderColor = useThemeColor(
    { light: "#e8cece", dark: "#333333" },
    "background"
  );
  const cardBackground = useThemeColor(
    { light: "#fcf8f8", dark: "#1a1a1a" },
    "background"
  );

  const styles = StyleSheet.create({
    scoreboard: {
      backgroundColor: cardBackground,
      borderRadius: 8,
      padding: 16,
      marginTop: 8,
    },
    scoreboardHeader: {
      marginBottom: 12,
    },
    scoreboardTitle: {
      fontSize: 16,
      fontFamily: Fonts.lexend.bold,
      color: textColor,
    },
    scoreboardRow: {
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    },
    scoreboardPlayer: {
      fontSize: 14,
      fontFamily: Fonts.notoSans.regular,
      color: secondaryTextColor,
      flex: 1,
    },
    scoreboardScores: {
      gap: 16,
    },
    scoreboardScore: {
      fontSize: 14,
      fontFamily: Fonts.notoSans.regular,
      color: textColor,
      minWidth: 20,
      textAlign: "center",
    },
  });

  return (
    <Box style={styles.scoreboard}>
      <HStack style={styles.scoreboardHeader}>
        <Text style={styles.scoreboardTitle}>Match Score</Text>
      </HStack>
      <HStack style={styles.scoreboardRow}>
        <Text style={styles.scoreboardPlayer}>{player1.name}</Text>
        <HStack style={styles.scoreboardScores}>
          <Text style={styles.scoreboardScore}>{player1.scores[0]}</Text>
          <Text style={styles.scoreboardScore}>{player1.scores[1]}</Text>
        </HStack>
      </HStack>
      <HStack style={styles.scoreboardRow}>
        <Text style={styles.scoreboardPlayer}>{player2.name}</Text>
        <HStack style={styles.scoreboardScores}>
          <Text style={styles.scoreboardScore}>{player2.scores[0]}</Text>
          <Text style={styles.scoreboardScore}>{player2.scores[1]}</Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Scoreboard;
