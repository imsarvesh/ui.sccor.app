import { SearchMode, SearchResultsPage } from "@/graphql/types/graphql";
import { debounce } from "lodash";
import getSearchQuery from "../query/search";
import usePagination from "./usePagination";

export type SearchResultType = { search: SearchResultsPage };

type SearchOptions = {
  onLoad: (data: SearchResultType) => void;
  onLoadMore: (data: SearchResultType) => void;
  mode?: SearchMode;
  skip?: boolean;
};

const useSearch = (options?: SearchOptions) => {
  const { mode = SearchMode.Latest, onLoad, onLoadMore } = options;

  const getNextToken = ({ search }: SearchResultType): string => {
    const { nextToken } = search;
    return nextToken;
  };

  const { load, ...rest } = usePagination<SearchResultType, any>(
    getSearchQuery,
    {
      nextFetchPolicy: "no-cache",
      skip: true,
      onLoad,
      onLoadMore,
      getNextToken,
      variables: {
        mode,
        query: "",
        isHashTag: false,
      },
    }
  );

  const onEmpty = () => {
    return Promise.resolve(
      onLoad({
        search: {
          nextToken: null,
          results: [],
        },
      })
    );
  };

  const onSearch = debounce((params = {} as any) => {
    if (params.query === "") return onEmpty();

    return load({
      mode,
      query: "",
      isHashTag: false,
      ...params,
    });
  }, 300);

  return {
    onSearch,
    ...rest,
  };
};

export default useSearch;
