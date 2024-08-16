import type { RequestError } from '@octokit/request-error';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { client } from '@/api/client';

import type { User } from './types';

type Users = User[];

type FetchUsersParams = { username: string };

const LIMIT = 5;

export const useUsers = ({
  username,
}: FetchUsersParams): UseQueryResult<Users, RequestError> => {
  return useQuery<Users, RequestError>({
    queryKey: ['users', username],
    queryFn: async () => {
      const response = await client.request(
        `GET /search/users?q={username}&per_page={limit}`,
        {
          username,
          limit: LIMIT,
        }
      );
      return response.data.items;
    },
    enabled: !!username,
  });
};
