import { useQuery } from "@apollo/client/react";
import getRecentMatch from "../query/getRecentMatch";
import { useEffect, useState } from "react";
import { Match, Post } from "@/graphql/types/graphql";
import { groupBy } from "lodash";
import { ErrorLike } from "@apollo/client";

export interface IRecentMatchBySportType {
  [key: string]: Post[];
}

export interface IRecentMatch {
  [key: string]: IRecentMatchBySportType;
}

const useRecentMatch = (): {
  recentMatch: IRecentMatch;
  isLoading: boolean;
  categories: string[];
  error: ErrorLike | undefined;
} => {
  const [recentMatch, setRecentMatch] = useState<IRecentMatch>({});
  const [categories, setCategories] = useState<string[]>([]);
  const {
    data,
    loading: isLoading,
    error,
  } = useQuery<{ recentMatch: Post[] }>(getRecentMatch);
  useEffect(() => {
    if (data) {
      const groupedMatches = groupBy(
        data.recentMatch,
        (match: Post) => match.data.sportType
      );

      const categories = Object.keys(groupedMatches);
      setCategories(categories);

      const matchesByStatus = categories.reduce((acc, category) => {
        const matches = groupedMatches[category];

        const matchesByStatus = groupBy(matches, (post: Post) => {
          if ((post.data as Match).isLive) return "live";
          if ((post.data as Match).completed) return "completed";
          return "upcoming";
        });

        acc[category] = matchesByStatus;
        return acc;
      }, {});

      //   console.log("matchesByStatus", JSON.stringify(matchesByStatus, null, 2));

      setRecentMatch(matchesByStatus);
    }
  }, [data]);
  return { recentMatch, isLoading, error, categories };
};

export default useRecentMatch;
