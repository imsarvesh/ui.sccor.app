import { useStore } from "@/providers/PostProvider";

import Match from "./templates/Match";
import News from "./templates/News";
import Post from "./templates/Post";
import Tournament from "./templates/Tournament";

const PostComponent = () => {
  const post = useStore();

  if (String(post.type) === "Match") {
    return <Match />;
  } else if (String(post.type) === "News") {
    return <News />;
  } else if (String(post.type) === "Tournament") {
    return <Tournament />;
  } else {
    return <Post />;
  }
};

export default PostComponent;
