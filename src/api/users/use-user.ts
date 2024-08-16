import type { RequestError } from '@octokit/request-error';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { client } from '@/api/client';

import type { User } from './types';

type Users = User[];

type Variable = { username: string };

export const useUsers = ({
  username,
}: Variable): UseQueryResult<Users, RequestError> => {
  return useQuery<Users, RequestError>({
    queryKey: ['users', username],
    queryFn: async () => {
      const response = await client.request(
        `GET /search/users?q=${username}&per_page=5`
      );
      return response.data.items;
    },
    enabled: !!username,
  });
};
