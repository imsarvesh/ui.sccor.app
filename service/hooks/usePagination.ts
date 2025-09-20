import { DocumentNode, OperationVariables } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useEffect } from "react";

const usePagination = <T, V extends OperationVariables = OperationVariables>(
  query: DocumentNode,
  options: {
    variables?: V;
    onLoad: (data: T) => void;
    onLoadMore: (data: T) => void;
    getNextToken: (data: T) => string;
    limit?: number;
    [key: string]: any;
  }
): ReturnType<typeof useQuery<T, V>> & {
  isLoading: boolean;
  loadMore: (nextToken: string | null) => Promise<void>;
  load: (variables?: Partial<V>) => Promise<void>;
} => {
  const {
    variables,
    onLoad,
    onLoadMore,
    limit = 10,
    ...otherOptions
  } = options;

  const response = useQuery<T, V>(query, {
    ...otherOptions,
    variables: {
      ...variables,
      limit,
    } as V,
  });

  const { loading: isLoading, refetch, data } = response;

  useEffect(() => {
    if (data) {
      onLoad(data);
    }
  }, [data, onLoad]);

  const loadMore = async (nextToken: string | null) => {
    debugger;
    if (!nextToken) return Promise.resolve();

    return response
      .refetch({ ...variables, nextToken } as unknown as V)
      .then(({ data }: { data: T }) => onLoadMore(data));
  };

  const load = async (variables: Partial<V> = {}) => {
    return refetch({ ...variables, nextToken: null } as unknown as V).then(
      ({ data }: { data: T }) => {
        onLoad(data);
      }
    );
  };

  return {
    ...response,
    isLoading,
    loadMore,
    load,
  };
};

export default usePagination;
