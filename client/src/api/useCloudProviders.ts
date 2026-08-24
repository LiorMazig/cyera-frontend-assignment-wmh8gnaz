import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CloudProviderDto } from '../../../common/dtos/cloud-provider.dto';
import { CLOUD_PROVIDERS_QUERY_KEY } from '../constants';
import { api } from './api';
import { ApiRequestError } from './types';

export const useCloudProviders = (): UseQueryResult<
  CloudProviderDto[],
  ApiRequestError
> =>
  useQuery({
    queryKey: [CLOUD_PROVIDERS_QUERY_KEY],
    queryFn: () => api.getCloudProviders(),
  });
