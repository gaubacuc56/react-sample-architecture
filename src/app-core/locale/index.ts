import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enJSON from '@/translation/en';
import vnJSON from '@/translation/vn';

export enum Locales  {
    ENGLISH = 'en',
    VIETNAMESE = 'vn',
}
export type LocaleType = Locales;

const resources = {
	en: { translation: enJSON },
	vn: { translation: vnJSON },
};

i18n.use(initReactI18next).init({
	resources,
	keySeparator: false,
	lng: Locales.ENGLISH,
	fallbackLng: Locales.ENGLISH,
	react: {
		useSuspense: true,
	},
	interpolation: {
		escapeValue: false,
	},
});

export const dateLocales: {
    [key: string]: () => Promise<ILocale>
} = {
    en: () => import('dayjs/locale/en'),
}

export default i18n;
