import { config } from '~shared/config';
import { ResponseError, ResponseSuccess } from '~shared/response';

import { useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';

import { Superhero } from '../superhero';

type ResponsePayload = {
  'results-for': string;
  results: Superhero[];
};

export type Params = {
  query: string;
};

export function useSearchSuperheros(params: Params) {
  const { query } = params;

  // Method documentation: https://superheroapi.com/#name
  // Example call: GET https://superheroapi.com/api/${access-token}/search/${superhero-name}
  return useQuery({
    queryKey: superheroKeys.search(query),
    queryFn: async () => {
      if (!query.trim()) {
        return { results: [], 'results-for': '' } as ResponsePayload;
      }

      const response = await fetch(
        `${config.apiHost}/${config.apiToken}/search/${encodeURIComponent(query)}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors'
        }
      );

      const data = await response.json() as ResponseSuccess<ResponsePayload> | ResponseError;

      if (data.response === 'error') {
        throw new Error(data.error || 'Failed to search superheroes');
      }

      return data as ResponseSuccess<ResponsePayload>;
    },
    enabled: Boolean(query.trim()),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
}
