import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";
import { useColorScheme } from "../hooks/useColorScheme";
import { SafeAreaView } from "../components/ui";

interface AddAchievementPageProps {
  // Add any props you might need for the page
}

type AchievementType = "individual" | "match" | null;

const AddAchievementPage: React.FC<AddAchievementPageProps> = () => {
  const [selectedType, setSelectedType] = useState<AchievementType>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handleSelectType = (type: AchievementType) => {
    setSelectedType(type);
  };

  const styles = StyleSheet.create({
    pageContainer: {
      flex: 1,
      backgroundColor: colors.backgroundPrimary,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 16,
      paddingBottom: 8,
      backgroundColor: colors.backgroundPrimary,
    },
    closeButton: {
      width: 48,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      flex: 1,
      fontSize: 18,
      fontFamily: Fonts.lexend.bold,
      color: colors.primaryText,
      textAlign: "center",
      paddingRight: 48,
      lineHeight: 22,
      letterSpacing: -0.27,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: Fonts.lexend.bold,
      color: colors.primaryText,
      lineHeight: 22,
      letterSpacing: -0.27,
      paddingHorizontal: 16,
      paddingBottom: 8,
      paddingTop: 16,
    },
    achievementOption: {
      flexDirection: "row",
      alignItems: "stretch",
      justifyContent: "space-between",
      gap: 16,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    optionContent: {
      flex: 2,
      gap: 4,
    },
    optionTitle: {
      fontSize: 16,
      fontFamily: Fonts.lexend.bold,
      color: colors.primaryText,
      lineHeight: 20,
    },
    optionDescription: {
      fontSize: 14,
      fontFamily: Fonts.notoSans.regular,
      color: "#49739c",
      lineHeight: 20,
    },
    optionImage: {
      flex: 1,
      aspectRatio: 16 / 9,
      borderRadius: 12,
    },
    selectedPreview: {
      marginTop: 16,
    },
    spacer: {
      height: 20,
      backgroundColor: colors.backgroundPrimary,
    },
  });

  const getSelectedPreviewData = () => {
    if (selectedType === "individual") {
      return {
        title: "Individual Achievement",
        description: "Personal Milestone",
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAp50l-qGlrHkOlFHTfJeTlncuOCkb5YsG_x68EyinvwvjjD3xmTkKB3w82vEL4e5k03kpKtkXoj2BHU5tbQhvsRvpQEPWdzhFWNy1WNS5TgNN3CPvaRHW4GL5sb7OA-Z2qvEM-sT9QSWULwQRAz5x65nUJOgY4CrKM57uB1Vm2ZHwgSVkFadiqIQVDlBGi7emTDW5hQtfFemEUWs2gCx3va1gk9e3CYjkkreLW6UaYGn8gqQ3JZKQrAXRl7vLei9aPtrtO_p-A4rs",
      };
    } else if (selectedType === "match") {
      return {
        title: "Post Match Result",
        description: "Team Victory",
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDGP5jDzTa9TZ3Crxnni0p3n8wxhSZwnrrXcP-_p1uCZ0dsz1SqBXwpsG4KhWmAmydJzDDNK3Zy5iJHC0yvjyhTXb0t6cz6w38O-oNS2pPYbcyDMwz6rNM4vfWacwn7tw1VY7z60Xhyfad8Oq5aM1ZVUxruCrld8mikUfVvcepEGpejewgy_hmtGiHY__OEVY55xpM7htd3RqQgRdiFXV1Q5dZZNKXZBftZ7SAxR3OQyzwU2IMbv8CuQfUgDTiuqd21jp3KBqWuPoc",
      };
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Text style={{ color: colors.primaryText, fontSize: 24 }}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Achievement</Text>
        </View>

        {/* Choose Achievement Type Section */}
        <Text style={styles.sectionTitle}>Choose Achievement Type</Text>

        {/* Individual Achievement Option */}
        <TouchableOpacity
          style={styles.achievementOption}
          onPress={() => handleSelectType("individual")}
        >
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Add Individual Achievement</Text>
            <Text style={styles.optionDescription}>
              Share your personal bests and milestones
            </Text>
          </View>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQkipnNDZQi2UgGteOuoB5I2CNSGoaSJ9tmTDwQQjM0ViL9EfvXDFZp3wti37aIy2qefT5PB8X0HSN4oHsZ-rqBmeLq1AFoFTUxpPnC7cNoQ6LZNwuP3dVXrLyeJ7ZHO1jPb_b9bhl9u_pqUXKqNr-f4E6yRLDBZPzr_wjGgd6KTzBUhjh3_0KbTG6_j4JQ8IoJOgZryTk-iVi0op-oUm4EU90fdLyf-QyXOEkyLNj5VDrPV7ArWqlr023GnGvlHw6w9wbiHbunLw",
            }}
            style={styles.optionImage}
            resizeMode="cover"
            alt="Personal Achievement option"
          />
        </TouchableOpacity>

        {/* Post Match Result Option */}
        <TouchableOpacity
          style={styles.achievementOption}
          onPress={() => handleSelectType("match")}
        >
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Post Match Result</Text>
            <Text style={styles.optionDescription}>
              Share team victories and match outcomes
            </Text>
          </View>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGP5jDzTa9TZ3Crxnni0p3n8wxhSZwnrrXcP-_p1uCZ0dsz1SqBXwpsG4KhWmAmydJzDDNK3Zy5iJHC0yvjyhTXb0t6cz6w38O-oNS2pPYbcyDMwz6rNM4vfWacwn7tw1VY7z60Xhyfad8Oq5aM1ZVUxruCrld8mikUfVvcepEGpejewgy_hmtGiHY__OEVY55xpM7htd3RqQgRdiFXV1Q5dZZNKXZBftZ7SAxR3OQyzwU2IMbv8CuQfUgDTiuqd21jp3KBqWuPoc",
            }}
            style={styles.optionImage}
            resizeMode="cover"
            alt="Match Result option"
          />
        </TouchableOpacity>

        {/* Selected Activity Preview */}
        {selectedType && (
          <View style={styles.selectedPreview}>
            <Text style={styles.sectionTitle}>Selected Activity Preview</Text>
            <View style={styles.achievementOption}>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>
                  {getSelectedPreviewData()?.title}
                </Text>
                <Text style={styles.optionDescription}>
                  {getSelectedPreviewData()?.description}
                </Text>
              </View>
              <Image
                source={{
                  uri: getSelectedPreviewData()?.imageUrl,
                }}
                style={styles.optionImage}
                resizeMode="cover"
                alt="Selected achievement preview"
              />
            </View>
          </View>
        )}

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAchievementPage;
