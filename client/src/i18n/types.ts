import en from './locales/en.json';

export type Language = 'en' | 'he';

/** The English file is the contract: every other locale must match its keys. */
export type Translations = typeof en;

export type TranslationKey = keyof Translations;

/** Values interpolated into a `{{placeholder}}` in a translation. */
export type TranslationParams = Record<string, string | number>;

export type Translate = (
  key: TranslationKey,
  params?: TranslationParams
) => string;
