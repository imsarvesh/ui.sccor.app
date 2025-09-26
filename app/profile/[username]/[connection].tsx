import { MessageItem } from "@/components";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import withLogin from "@/components/withLogin";
import { Colors } from "@/constants/Colors";
import { Conversation } from "@/graphql/types/graphql";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useStore } from "@/providers";
import timeAgo from "@/service/utils/timeAgo";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Tabs from "./tabs";
import FollowersList from "./followersList";
import FollowingList from "./followingList";

function MessagesScreen() {
  const { username, connection }: { username: string; connection: string } =
    useLocalSearchParams();

  console.log("connection", connection);
  const [activeTab, setActiveTab] = useState(connection);

  const { profile } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const backgroundColor = useThemeColor({}, "background");

  const handleMessagePress = (message: Conversation) => {
    router.push(`/messages/${message.otherUser.id}`);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    content: {
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      {/* Header */}
      <Header
        title={profile.name}
        isBack={true}
        isSearch={false}
        onBackPress={() => router.back()}
      />

      <Tabs
        categories={["followers", "following"]}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
        }}
      />

      {activeTab === "followers" && <FollowersList />}
      {activeTab === "following" && <FollowingList />}
    </SafeAreaView>
  );
}

export default withLogin(MessagesScreen);
