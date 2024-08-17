import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { usePageStore } from '@/stores';

import { client } from '../client';

type FetchReposParams = {
  username: string;
};

const LIMIT = 10;

export const useRepos = ({ username }: FetchReposParams) => {
  const page = usePageStore.use.page();
  const setMaxPage = usePageStore.use.setMaxPage();
  const incrementPage = usePageStore.use.incrementPage();

  const queryKey = ['repos', username];

  // Had to debug it because I had exceeded the rate limit
  const fetchRepos = async ({ pageParam = 1 }) => {
    try {
      const response = await client.request('GET /users/{username}/repos', {
        username,
        per_page: LIMIT,
        page: pageParam,
      });

      if (response.data.length < LIMIT) {
        setMaxPage(pageParam);
      }

      return {
        data: response.data,
        nextPage: response.data.length === LIMIT ? pageParam + 1 : undefined,
      };
    } catch (error) {
      throw error;
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey,
      queryFn: fetchRepos,
      getNextPageParam: (lastPage) => {
        return lastPage?.nextPage;
      },
      initialPageParam: page,
      enabled: !!username,
    });

  const flattenData = useMemo(() => {
    return data?.pages.flatMap((dataPage) => dataPage.data) || [];
  }, [data]);

  const loadNext = useCallback(() => {
    if (hasNextPage) {
      incrementPage();
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, incrementPage]);

  return {
    data: flattenData,
    fetchNextPage: loadNext,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
  };
};
