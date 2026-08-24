import { CloudProviderDto } from '../../../common/dtos/cloud-provider.dto';
import { SelectOption } from '../types/select';

/**
 * Locale key for a provider name coming from the server, e.g. `Microsoft365`
 * becomes `providers.microsoft365`. Keyed on the name rather than the id, since
 * ids are database values while the name is stable and readable in the json.
 */
export const getProviderTranslationKey = (displayName: string): string =>
  `providers.${displayName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;

export const toProviderOptions = (
  cloudProviders: CloudProviderDto[],
  translateName: (displayName: string) => string
): SelectOption[] =>
  cloudProviders.map(({ id, displayName }) => ({
    value: id,
    displayName: translateName(displayName),
  }));

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
