import { Header, MessageItem } from "@/components";
import SearchInput from "@/components/SearchInput";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useListConversations from "@/service/hooks/useListConversations";
import { useStore } from "@/providers/StoreProvider/useStore";
import withLogin from "@/components/withLogin";
import { Conversation } from "@/graphql/types/graphql";
import timeAgo from "@/service/utils/timeAgo";

function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const backgroundColor = useThemeColor({}, "background");
  const { isLoggedIn, listConversations } = useStore();

  useListConversations();

  const conversations = Array.from(listConversations.conversations.values());

  const handleMessagePress = (message: Conversation) => {
    router.push(`/messages/${message.otherUser.id}`);
  };

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.otherUser.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <Header title="Messages" isBack={true} />

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Search Bar */}
        <SearchInput
          placeholder="Search Direct Messages"
          autoFocus={true}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {filteredConversations.map((conversation) => (
          <MessageItem
            key={conversation.id}
            name={conversation.otherUser.name}
            message={conversation.lastMessage}
            date={timeAgo(new Date(+conversation.updateAt))}
            avatar={
              conversation.otherUser.image ||
              "https://lh3.googleusercontent.com/aida-public/AB6AXuD3qX11vORi5Koe3QQMnBN9vbzHFd4kaGIRNavkgso8_mMlALIu0JFT2DWWA5-YuF-d_jgb9K2-SsLEmgK86VhH8NJ8MDI2ZKansEtHEV5WwSk7g9wb9LweOs3LmwziT1qLGBc_xarQRlsDqJ9ykMpmBnxHKp8RFIH8nMOVl8pmjkXbNOZ2d-i-EIxgQw2gEnULGRwLqMQ_MCN2ZGfLDK9JbcshP35BhodZMBsl_WC4rAlgNx1cshPuF0XOsRTrT4dKJyfNmmYm8BI"
            }
            onPress={() => handleMessagePress(conversation)}
            colors={{
              primaryText: colors.primaryText,
              secondaryText: colors.secondaryText,
              backgroundPrimary: colors.backgroundPrimary,
            }}
          />
        ))}
        {/* Messages List */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default withLogin(MessagesScreen);
