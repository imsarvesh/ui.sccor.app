import { Header, MessageItem } from "@/components";
import SearchInput from "@/components/SearchInput";
import { Colors } from "@/constants/Colors";
import {
  OtherProfile,
  SearchMode,
  SearchResult,
} from "@/graphql/types/graphql";
import { useThemeColor } from "@/hooks/useThemeColor";
import useSearch, { SearchResultType } from "@/service/hooks/useSearch";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const defaultImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD3qX11vORi5Koe3QQMnBN9vbzHFd4kaGIRNavkgso8_mMlALIu0JFT2DWWA5-YuF-d_jgb9K2-SsLEmgK86VhH8NJ8MDI2ZKansEtHEV5WwSk7g9wb9LweOs3LmwziT1qLGBc_xarQRlsDqJ9ykMpmBnxHKp8RFIH8nMOVl8pmjkXbNOZ2d-i-EIxgQw2gEnULGRwLqMQ_MCN2ZGfLDK9JbcshP35BhodZMBsl_WC4rAlgNx1cshPuF0XOsRTrT4dKJyfNmmYm8BI";

const SearchPage = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const backgroundColor = useThemeColor({}, "background");
  const [results, setResults] = useState<SearchResult[]>([]);
  const { onSearch } = useSearch({
    mode: SearchMode.People,
    onLoad: (data: SearchResultType) => {
      setResults(data.search.results);
    },
    onLoadMore: (data: SearchResultType) => {
      setResults((prev) => [...prev, ...data.search.results]);
    },
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    content: {
      flex: 1,
    },
    userImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    userContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    userName: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 4,
    },
    userBio: {
      fontSize: 14,
      fontWeight: "normal",
      marginTop: 4,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header title="Search" isBack={true} isSearch={false} />
        <SearchInput
          placeholder="Search"
          autoFocus={true}
          onChangeText={(text) => {
            onSearch({ query: text, limit: 3 });
          }}
        />
        <ScrollView style={styles.content}>
          {/* create list of users with image and name */}
          {results.map((user: OtherProfile) => (
            <MessageItem
              key={user.id}
              name={user.name}
              message={user.bio || user.email}
              date={null}
              avatar={user.image || defaultImage}
              onPress={() => router.push(`/messages/${user.id}`)}
              colors={{
                primaryText: colors.primaryText,
                secondaryText: colors.secondaryText,
                backgroundPrimary: colors.backgroundPrimary,
              }}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchPage;
