import en from './locales/en.json';
import he from './locales/he.json';
import {
  Language,
  TranslationKey,
  TranslationParams,
  Translations,
} from './types';

export const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Annotating each locale as `Translations` makes a missing or misspelled key a
 * compile error rather than a blank label at runtime.
 */
export const LOCALES: Record<Language, Translations> = {
  en,
  he: he as Translations,
};

/** BCP 47 tag per language, used for `Intl` date and month formatting. */
export const LOCALE_TAGS: Record<Language, string> = {
  en: 'en-US',
  he: 'he-IL',
};

export const SUPPORTED_LANGUAGES = Object.keys(LOCALES) as Language[];

const PLACEHOLDER_PATTERN = /{{(\w+)}}/g;

const interpolate = (template: string, params?: TranslationParams): string =>
  params
    ? template.replace(PLACEHOLDER_PATTERN, (match, name: string) =>
        name in params ? String(params[name]) : match
      )
    : template;

export const translate = (
  language: Language,
  key: TranslationKey,
  params?: TranslationParams
): string =>
  interpolate(LOCALES[language][key] ?? LOCALES[DEFAULT_LANGUAGE][key], params);

/**
 * Translates a key that may not exist — used for server-provided names, where a
 * locale file can override the value but is not required to carry one.
 */
export const translateOptional = (
  language: Language,
  key: string,
  fallback: string,
  params?: TranslationParams
): string =>
  key in LOCALES[language]
    ? translate(language, key as TranslationKey, params)
    : fallback;

/** Matches a browser language tag (`he`, `he-IL`, `en-GB`) to a supported language. */
export const resolveLanguage = (
  languageTag: string | undefined
): Language =>
  SUPPORTED_LANGUAGES.find(
    (language) => languageTag?.toLowerCase().split('-')[0] === language
  ) ?? DEFAULT_LANGUAGE;
