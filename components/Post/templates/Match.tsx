import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useStore } from "@/providers/PostProvider";
import { useRouter } from "expo-router";

const Post = () => {
  const post = useStore();
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity onPress={() => router.push(`/post/${post.data.id}`)}>
        <Text style={styles.badgeText}>Match {post.data.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  banner: {
    borderRadius: 16,
    overflow: "hidden",
    height: 200,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  bannerContent: {
    padding: 16,
    justifyContent: "flex-end",
    height: "100%",
  },
  bannerTitle: {
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 8,
  },
  bannerTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  bannerTagText: {
    color: "#181829",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
});
