import axios, { AxiosError } from 'axios';
import httpClient from '../http-client';
import { CloudProviderDto } from '../../../common/dtos/cloud-provider.dto';
import { ScanDto } from '../../../common/dtos/scan.dto';
import { ApiRequestError, GetScansParams } from './types';

const toApiError = (error: unknown): ApiRequestError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ error?: string; message?: string }>;

    return new ApiRequestError(
      axiosError.response?.data?.error || axiosError.response?.data?.message || '',
      axiosError.response?.status
    );
  }

  // No server message to show — the UI supplies a translated fallback.
  return new ApiRequestError('');
};

export const api = {
  async getCloudProviders(): Promise<CloudProviderDto[]> {
    try {
      const { data } = await httpClient.get<CloudProviderDto[]>(
        '/api/cloud-providers'
      );

      return data;
    } catch (error) {
      throw toApiError(error);
    }
  },

  async getScans(params?: GetScansParams): Promise<ScanDto[]> {
    try {
      const { data } = await httpClient.get<ScanDto[]>('/api/scans', { params });

      return data;
    } catch (error) {
      throw toApiError(error);
    }
  },
};
