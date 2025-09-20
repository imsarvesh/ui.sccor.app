import { View, Text } from "react-native";

import { useStore } from "@/providers/PostProvider";

const Post = () => {
  const post = useStore();

  return (
    <View>
      <Text>Dafault {post.id}</Text>
    </View>
  );
};

export default Post;
