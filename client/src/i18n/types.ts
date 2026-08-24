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

/** Translate a key that may be absent, falling back to the given text. */
export type TranslateOptional = (
  key: string,
  fallback: string,
  params?: TranslationParams
) => string;
