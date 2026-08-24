import { useContext } from 'react';
import { I18nContext, I18nContextValue } from '../i18n/I18nProvider';

export const useTranslation = (): I18nContextValue => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }

  return context;
};
