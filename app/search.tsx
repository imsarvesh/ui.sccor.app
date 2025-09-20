import LoadMoreButton from "@/components/LoadMoreButton";
import SearchInput from "@/components/SearchInput";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { SearchMode, SearchResultsPage } from "@/graphql/types/graphql";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useDispatch, useStore } from "@/providers";
import useSearch from "@/service/hooks/useSearch";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Pressable } from "../components/ui";

export type SearchResultType = { search: SearchResultsPage };

const tabs = Object.values(SearchMode);

const TabButton = ({
  title,
  isActive,
  onPress,
  colors,
}: {
  title: string;
  isActive: boolean;
  onPress: (title: string) => void;
  colors: any;
}) => {
  const styles = StyleSheet.create({
    tabButton: {
      paddingVertical: 16,
      paddingHorizontal: 4,
      borderBottomWidth: 3,
      marginRight: 32,
    },
    tabText: {
      fontSize: 14,
      fontWeight: "bold",
    },
  });
  return (
    <Pressable
      style={[
        styles.tabButton,
        { borderBottomColor: isActive ? colors.tint : "transparent" },
      ]}
      onPress={() => onPress(title)}
    >
      <Text
        style={[
          styles.tabText,
          {
            color: isActive ? colors.primaryText : colors.secondaryText,
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

interface SearchResult {
  id: string;
  title: string;
  name: string;
  subtitle?: string;
  __typename: string;
  avatar?: string;
  email?: string;
}

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Top");

  const { search } = useStore();
  const { results, nextToken } = search;

  const dispatch = useDispatch();
  const { onSearch, loadMore } = useSearch({
    onLoad: (data: SearchResultType) => {
      dispatch({
        type: "loadSearch",
        payload: data.search,
      });
    },
    onLoadMore: (data: SearchResultType) => {
      dispatch({
        type: "loadMoreSearch",
        payload: data.search,
      });
    },
  });

  const renderSearchResult = (result: SearchResult) => {
    switch (result.__typename) {
      case "OtherProfile":
        return (
          <TouchableOpacity
            key={result.id}
            style={styles.userResult}
            onPress={() => router.push(`/post/1`)}
          >
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPQG8ZqSZS7Y0Ql-mYYZaWfYSQ25Dqx9w_hNeZHwysIlZ8OXDvBWujKKWSR6yzTWZPQ1SSA9I9gW7_s_mjOwJQBwSHQb7AKSquoCVgWpQi9YX7y2HpxlDiFvohFjhCVoFTxIS-ICBw-SP-dGW-qnZmWSkKComob6rUNteI4lYEMp9j0hqcYtTMZ_KYnBx2oyOOJF2X7eAywAMqtlZqDE-nEaAoOGf2VTXlXB1flbxWEY7RwigxPmHBash322Ugh4ISHo4Lw2QWogc",
              }}
              style={styles.userAvatar}
            />
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.primaryText }]}>
                {result.name}
              </Text>
              <Text
                style={[styles.userHandle, { color: colors.secondaryText }]}
              >
                {result.email}
              </Text>
            </View>
          </TouchableOpacity>
        );

      case "Match":
        return (
          <TouchableOpacity
            key={result.id}
            style={styles.resultItem}
            onPress={() => router.push(`/post/1`)}
          >
            <View style={styles.resultContent}>
              <Text style={styles.resultTitle} numberOfLines={1}>
                {result.name}
              </Text>
              <Text style={styles.resultSubtitle} numberOfLines={2}>
                {result.__typename}
              </Text>
            </View>
          </TouchableOpacity>
        );

      case "Tournament":
        return (
          <TouchableOpacity
            key={result.id}
            style={styles.resultItem}
            onPress={() => router.push(`/post/1`)}
          >
            <View style={styles.resultContent}>
              <Text style={styles.resultTitle} numberOfLines={1}>
                {result.name}
              </Text>
              <Text style={styles.resultSubtitle} numberOfLines={2}>
                {result.__typename}
              </Text>
            </View>
          </TouchableOpacity>
        );

      case "News":
        return (
          <TouchableOpacity
            key={result.id}
            style={styles.resultItem}
            onPress={() => router.push(`/post/1`)}
          >
            <View style={styles.resultContent}>
              <Text style={styles.resultTitle} numberOfLines={1}>
                {result.title}
              </Text>
              <Text style={styles.resultSubtitle} numberOfLines={2}>
                {result.__typename}
              </Text>
            </View>
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundPrimary,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 16,
      paddingBottom: 8,
      backgroundColor: colors.backgroundPrimary,
    },
    backButton: {
      width: 48,
      height: 48,
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitle: {
      flex: 1,
      fontSize: 18,
      fontFamily: Fonts.lexend.bold,
      fontWeight: "bold",
      textAlign: "center",
      color: colors.primaryText,
      marginRight: 48, // To center the title accounting for back button
    },
    searchContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    searchInput: {
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 12,
      height: 56,
      paddingHorizontal: 16,
      fontSize: 16,
      fontFamily: Fonts.notoSans.regular,
      color: colors.primaryText,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: Fonts.lexend.bold,
      fontWeight: "bold",
      color: colors.primaryText,
      paddingHorizontal: 16,
      paddingBottom: 8,
      paddingTop: 16,
    },
    resultContent: {
      flex: 1,
      justifyContent: "center",
    },
    resultItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      minHeight: 56,
      backgroundColor: colors.backgroundPrimary,
    },
    resultTitle: {
      fontSize: 16,
      fontFamily: Fonts.notoSans.medium,
      color: colors.primaryText,
      lineHeight: 20,
    },
    resultSubtitle: {
      fontSize: 14,
      fontFamily: Fonts.notoSans.regular,
      color: colors.secondaryText,
      lineHeight: 18,
      marginTop: 2,
    },
    resultText: {
      fontSize: 16,
      fontFamily: Fonts.notoSans.regular,
      flex: 1,
    },
    userResult: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 8,
      minHeight: 72,
      backgroundColor: colors.backgroundPrimary,
    },
    userAvatar: {
      width: 32,
      height: 32,
      borderRadius: 12,
      marginRight: 16,
    },
    userInfo: {
      flex: 1,
      justifyContent: "center",
    },
    userName: {
      fontSize: 16,
      fontFamily: Fonts.notoSans.medium,
      fontWeight: "500",
      marginBottom: 2,
    },
    userHandle: {
      fontSize: 14,
      fontFamily: Fonts.notoSans.regular,
    },
    bottomSpacer: {
      height: 20,
      backgroundColor: colors.backgroundPrimary,
    },
    tabButton: {
      paddingVertical: 16,
      paddingHorizontal: 4,
      borderBottomWidth: 3,
      marginRight: 32,
    },
    tabText: {
      fontSize: 14,
      fontWeight: "bold",
    },
    tabsContainer: {
      paddingBottom: 12,
    },
    tabs: {
      paddingHorizontal: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      {/* Search Bar */}
      <SearchInput
        placeholder="Search instructors"
        autoFocus={true}
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          onSearch({ query: text, limit: 3 });
        }}
      />
      {/* Tabs */}
      <Box style={[styles.tabsContainer]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab}
              title={tab}
              isActive={activeTab === tab}
              onPress={(tab) => {
                setActiveTab(tab);
                onSearch({ query: searchQuery, limit: 3, mode: tab });
              }}
              colors={colors}
            />
          ))}
        </ScrollView>
      </Box>
      <ScrollView style={{ flex: 1 }}>
        {results.map(renderSearchResult)}
        {/* Load More Button */}
        {nextToken && (
          <LoadMoreButton
            onPress={() => {
              loadMore(nextToken);
            }}
            text="Load More Results"
            colors={colors}
          />
        )}
        {/* Bottom spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
