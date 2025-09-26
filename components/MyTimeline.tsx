import { useStore } from "@/providers";
import useMyTimeline from "@/service/hooks/useMyTimeline";
import { FlashList } from "@shopify/flash-list";
import React, { forwardRef, useImperativeHandle } from "react";
import { ActivityIndicator } from "react-native";
import Post from "./Post";

export type TimelineRef = {
  reload: () => Promise<void>;
};

function Timeline(props, ref) {
  const { isLoading, loadMore, load } = useMyTimeline();
  const { timeline } = useStore();

  useImperativeHandle(
    ref,
    () => ({
      reload: load,
    }),
    [load]
  );

  if (isLoading) return <ActivityIndicator />;

  return (
    <FlashList
      data={timeline.posts}
      renderItem={({ item }) => {
        return <Post key={item.id} post={item} />;
      }}
      onEndReachedThreshold={0}
      onEndReached={() => {
        // loadMore(timeline.nextToken);
      }}
    />
  );
}

const TimelineComponent = forwardRef(Timeline);

export default TimelineComponent;
