import { useMemo } from 'react';
import { CloudProviderDto } from '../../../common/dtos/cloud-provider.dto';
import { SelectOption } from '../types/select';
import {
  getProviderTranslationKey,
  toProviderOptions,
} from '../utils/cloud-providers';
import { useTranslation } from './useTranslation';

/**
 * Select options for the provider filter, with each server-provided name
 * replaced by its locale override when one exists.
 */
export const useProviderOptions = (
  cloudProviders: CloudProviderDto[] | undefined
): SelectOption[] => {
  const { tOr } = useTranslation();

  return useMemo(
    () =>
      toProviderOptions(cloudProviders ?? [], (displayName) =>
        tOr(getProviderTranslationKey(displayName), displayName)
      ),
    [cloudProviders, tOr]
  );
};
