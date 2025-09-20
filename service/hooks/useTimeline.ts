import { PostsPage } from "@/graphql/types/graphql";
import { useDispatch } from "@/providers";
import { useCallback } from "react";
import getTimelineQuery from "../query/getTimeline";
import usePagination from "./usePagination";

type TimelineResult = { timeline: PostsPage };

const useTimeline = () => {
  const dispatch = useDispatch();

  const onLoad = useCallback(
    (data: TimelineResult) => {
      dispatch({
        type: "loadTimeline",
        payload: data.timeline,
      });
    },
    [dispatch]
  );

  const onLoadMore = useCallback(
    (data: TimelineResult) => {
      dispatch({
        type: "loadMoreTimeline",
        payload: data.timeline,
      });
    },
    [dispatch]
  );

  const getNextToken = ({ timeline }: TimelineResult): string => {
    const { nextToken } = timeline;
    return nextToken;
  };

  return usePagination<TimelineResult, any>(getTimelineQuery, {
    nextFetchPolicy: "no-cache",
    onLoad,
    onLoadMore,
    getNextToken,
  });
};

export default useTimeline;
