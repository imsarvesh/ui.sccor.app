import { useStore } from "@/providers/PostProvider";
import * as templates from "./templates";

const PostComponent = () => {
  const post = useStore();

  const Template = templates[post.type] || templates.Post;
  return <Template />;
};

export default PostComponent;
