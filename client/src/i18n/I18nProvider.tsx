import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import { LOCALE_TAGS, resolveLanguage, translate, translateOptional } from './i18n';
import { Language, Translate, TranslateOptional } from './types';

export interface I18nContextValue {
  language: Language;
  /** BCP 47 tag for `Intl` formatting. */
  locale: string;
  setLanguage: (language: Language) => void;
  t: Translate;
  /** For keys that may not exist, e.g. names coming from the server. */
  tOr: TranslateOptional;
}

export const I18nContext = createContext<I18nContextValue | undefined>(
  undefined
);

interface I18nProviderProps {
  children: ReactNode;
  /** Overrides the language detected from the browser — handy in tests. */
  initialLanguage?: Language;
}

export const I18nProvider = ({
  children,
  initialLanguage,
}: I18nProviderProps) => {
  const [language, setLanguage] = useState<Language>(
    () => initialLanguage ?? resolveLanguage(navigator.language)
  );

  const t: Translate = useCallback(
    (key, params) => translate(language, key, params),
    [language]
  );

  const tOr: TranslateOptional = useCallback(
    (key, fallback, params) =>
      translateOptional(language, key, fallback, params),
    [language]
  );

  const value = useMemo<I18nContextValue>(
    () => ({ language, locale: LOCALE_TAGS[language], setLanguage, t, tOr }),
    [language, t, tOr]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
