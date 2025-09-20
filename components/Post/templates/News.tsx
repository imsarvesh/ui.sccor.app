import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useStore } from "@/providers/PostProvider";
import * as WebBrowser from "expo-web-browser";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const News = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];
  const iconColor = useThemeColor({}, "icon");
  const { data: post } = useStore();

  const openBrowser = (url: string) => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={styles.container}>
      <VStack style={{ flex: 1, marginRight: 16 }}>
        <HStack style={styles.postHeader}>
          <Text
            style={{
              color: colors.secondaryText,
              fontSize: 12,
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 6,
            }}
          >
            {post.source}
          </Text>
        </HStack>
      </VStack>

      <TouchableOpacity
        onPress={() => openBrowser(post.link)}
        key={post.id}
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: colors.backgroundSecondary,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        {/* Post Header */}

        <VStack style={{ flex: 1, marginRight: 16 }}>
          <Text
            numberOfLines={2}
            style={{
              color: colors.primaryText,
              fontSize: 16,
              fontWeight: "bold",
              lineHeight: 20,
              marginBottom: 8,
            }}
          >
            {post.title}
          </Text>
          <Text
            style={{
              color: colors.secondaryText,
              fontSize: 14,
              lineHeight: 18,
            }}
            numberOfLines={2}
          >
            {post.description}
          </Text>
        </VStack>
        <Image
          source={{ uri: post.image }}
          style={{
            width: 96,
            height: 96,
            borderRadius: 8,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {},
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  postHeader: {
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  postActionButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 22,
    marginRight: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
  },
  timestamp: {
    color: "#888",
    fontSize: 12,
  },
  dot: {
    fontWeight: "bold",
  },
  privacy: {
    fontSize: 12,
  },
  postText: {
    fontSize: 15,
    color: "#222",
    marginBottom: 10,
  },
  linkPreview: {
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  linkInfo: {
    padding: 10,
  },
  linkTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 2,
    color: "#222",
  },
  linkUrl: {
    color: "#888",
    fontSize: 13,
  },
  reactionsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  reactionIcons: {
    fontSize: 16,
    marginRight: 6,
  },
  reactionText: {
    color: "#888",
    fontSize: 13,
  },
});
