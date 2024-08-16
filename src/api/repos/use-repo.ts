import type { RequestError } from '@octokit/types';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { client } from '../client';
import type { Repo } from './types';

type Repos = Repo[];

type Variable = { username: string };

export const useRepos = ({
  username,
}: Variable): UseQueryResult<Repos, RequestError> => {
  return useQuery<Repos, RequestError>({
    queryKey: ['repos', username],
    queryFn: async () => {
      const response = await client.request(`GET /users/${username}/repos`);
      return response.data;
    },
    enabled: !!username,
  });
};
