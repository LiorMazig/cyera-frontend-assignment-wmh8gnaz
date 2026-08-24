import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ScanDto } from '../../../common/dtos/scan.dto';
import { SCANS_QUERY_KEY } from '../constants';
import { api } from './api';
import { ApiRequestError } from './types';
import { getYearRange } from '../utils/date';

/**
 * Scans for a year, optionally narrowed to some cloud providers.
 * Provider ids are sorted in the key so selection order doesn't split the cache.
 */
export const useScans = (
  year: number,
  cloudProvidersIds: string[]
): UseQueryResult<ScanDto[], ApiRequestError> =>
  useQuery({
    queryKey: [SCANS_QUERY_KEY, year, [...cloudProvidersIds].sort()],
    queryFn: () =>
      api.getScans({
        ...getYearRange(year),
        cloudProvidersIds: cloudProvidersIds.length
          ? cloudProvidersIds
          : undefined,
      }),
  });
