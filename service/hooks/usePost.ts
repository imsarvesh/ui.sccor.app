import { useEffect, useRef } from "react";

import { Post, PostsPage } from "@/graphql/types/graphql";
import {
  MutationFunctionOptions,
  useMutation,
  useQuery,
} from "@apollo/client/react";
import mutationAddPost from "../mutation/addPost";
import mutationLikePost from "../mutation/likePost";
import mutationReply from "../mutation/reply";
import mutationUnLikePost from "../mutation/unlikePost";
import getPostById from "../query/getPostById";
import getReplyByPostId from "../query/getReplyByPostId";
import useMustLoggedIn from "./useMustLoggedIn";

// Type for the GraphQL query response
interface GetReplyByPostIdResponse {
  comments: PostsPage;
}

const useAddPost = () => {
  const [mutation, response] = useMutation(mutationAddPost);
  const addPost = async (
    text: string,
    media?: string[],
    visibility?: string
  ) => {
    return mutation({ variables: { text, media, visibility } });
  };

  return {
    addPost: useMustLoggedIn(addPost),
    response,
  };
};

const useLikePost = ({ onCompleted, ...options }: MutationFunctionOptions) => {
  const [mutation, response] = useMutation(mutationLikePost);

  const like = async ({ id, likes }: Post) =>
    mutation({
      variables: { postId: id },
      optimisticResponse: () => {
        const post = {
          id,
          liked: true,
          likes: likes + 1,
        };
        onCompleted({ post });
        return { post };
      },
      onCompleted,
      ...options,
    });

  return { like: useMustLoggedIn(like), response };
};

const useUnLikePost = ({
  onCompleted,
  ...options
}: MutationFunctionOptions) => {
  const [mutation, response] = useMutation(mutationUnLikePost);
  const unlike = async ({ id, likes }: Post) =>
    mutation({
      variables: { postId: id },
      optimisticResponse: () => {
        const post = {
          id,
          liked: false,
          likes: likes - 1,
        };
        onCompleted({ post });
        return { post };
      },
      onCompleted,
      ...options,
    });

  return { unlike: useMustLoggedIn(unlike), response };
};

const useReply = (postId: string) => {
  const [mutation, response] = useMutation(mutationReply);
  const reply = async ({ text }: { text: string }) => {
    return mutation({ variables: { postId, text } });
  };

  return {
    reply: useMustLoggedIn(reply),
    response,
  };
};

const useComments = (postId: string, onCompleted: any) => {
  const limit = 10;
  const commentsRef = useRef<any[]>([]);
  const nextTokenRef = useRef<string | null>(null);

  const {
    loading: isLoading,
    refetch,
    data,
    error,
  } = useQuery<GetReplyByPostIdResponse>(getReplyByPostId, {
    nextFetchPolicy: "no-cache",
    variables: {
      postId,
      nextToken: nextTokenRef.current,
      limit,
    },
  });

  // Handle errors
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  // Handle onCompleted using useEffect
  useEffect(() => {
    if (data?.comments) {
      const commentsData = data.comments as PostsPage;
      const { posts, nextToken } = commentsData;
      if (posts) {
        const map = [...commentsRef.current, ...posts].reduce(
          (acc, comment) => {
            acc.set(comment.id, comment);
            return acc;
          },
          new Map()
        );
        const result = Array.from(map.values());
        onCompleted(result);
        nextTokenRef.current = nextToken || null;
      }
    }
  }, [data, onCompleted]);

  const loadMore = () => {
    refetch({
      variables: {
        postId,
        nextToken: nextTokenRef.current,
        limit,
      },
    });
  };

  return {
    isLoading,
    loadMore,
  };
};

const usePostById = (postId: string): { loading: boolean; data: Post } => {
  return useQuery<Post>(getPostById, {
    variables: { postId },
  });
};

export {
  useAddPost,
  useComments,
  useLikePost,
  usePostById,
  useReply,
  useUnLikePost,
};
