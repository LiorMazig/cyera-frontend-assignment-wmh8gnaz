import { CloudProviderDto } from '../../../common/dtos/cloud-provider.dto';
import { SelectOption } from '../types/select';

export const toProviderOptions = (
  cloudProviders: CloudProviderDto[]
): SelectOption[] =>
  cloudProviders.map(({ id, displayName }) => ({ value: id, displayName }));

/**
 * Text shown in the closed select. An empty selection is not "nothing" — it is
 * the default of every provider, so the caller passes the label that says so.
 */
export const getSelectedProvidersLabel = (
  selectedValues: string[],
  options: SelectOption[],
  allSelectedLabel: string
): string =>
  selectedValues.length
    ? options
        .filter(({ value }) => selectedValues.includes(value))
        .map(({ displayName }) => displayName)
        .join(', ')
    : allSelectedLabel;
