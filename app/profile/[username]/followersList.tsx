import { MessageItem } from "@/components";
import SearchInput from "@/components/SearchInput";
import withLogin from "@/components/withLogin";
import { Colors } from "@/constants/Colors";
import { Conversation } from "@/graphql/types/graphql";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFollowersList } from "@/hooks/useProfile";
import { useThemeColor } from "@/hooks/useThemeColor";
import timeAgo from "@/service/utils/timeAgo";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

function MessagesScreen() {
  const { username }: { username: string } = useLocalSearchParams();

  const { profiles, isLoading } = useFollowersList({ username });

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
  });

  console.log("profiles", profiles);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchInput
        placeholder="Search..."
        autoFocus={true}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {[].map((user) => (
        <MessageItem
          key={user.id}
          name={user.otherUser.name}
          message={user.lastMessage}
          date={timeAgo(new Date(+user.updateAt))}
          avatar={
            user.otherUser.image ||
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD3qX11vORi5Koe3QQMnBN9vbzHFd4kaGIRNavkgso8_mMlALIu0JFT2DWWA5-YuF-d_jgb9K2-SsLEmgK86VhH8NJ8MDI2ZKansEtHEV5WwSk7g9wb9LweOs3LmwziT1qLGBc_xarQRlsDqJ9ykMpmBnxHKp8RFIH8nMOVl8pmjkXbNOZ2d-i-EIxgQw2gEnULGRwLqMQ_MCN2ZGfLDK9JbcshP35BhodZMBsl_WC4rAlgNx1cshPuF0XOsRTrT4dKJyfNmmYm8BI"
          }
          onPress={() => handleMessagePress(user)}
          colors={{
            primaryText: colors.primaryText,
            secondaryText: colors.secondaryText,
            backgroundPrimary: colors.backgroundPrimary,
          }}
        />
      ))}
    </View>
  );
}

export default withLogin(MessagesScreen);
