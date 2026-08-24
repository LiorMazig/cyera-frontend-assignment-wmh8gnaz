import { CloudProviderDto } from '../../../common/dtos/cloud-provider.dto';
import { ALL_PROVIDERS_LABEL } from '../constants';
import { SelectOption } from '../types/select';

export const toProviderOptions = (
  cloudProviders: CloudProviderDto[]
): SelectOption[] =>
  cloudProviders.map(({ id, displayName }) => ({ value: id, displayName }));

/**
 * Text shown in the closed select. An empty selection is not "nothing" — it is
 * the default of every provider, so it says so rather than rendering blank.
 */
export const getSelectedProvidersLabel = (
  selectedValues: string[],
  options: SelectOption[]
): string =>
  selectedValues.length
    ? options
        .filter(({ value }) => selectedValues.includes(value))
        .map(({ displayName }) => displayName)
        .join(', ')
    : ALL_PROVIDERS_LABEL;
