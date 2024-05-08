import { useEffect } from "react";
import i18n from "i18next";
import dayjs from "dayjs";

import { useAppSelector } from "@/app-core/redux-manager/method";
import { LocaleType, dateLocales } from "@app-core/locale";

function useLocale(language?: LocaleType) {
	const _appLanguage = useAppSelector(
		(state) => state.localeReducer.language
	);
	const currLanguage = language ?? _appLanguage;

	useEffect(() => {
		if (currLanguage !== i18n.language) {
			i18n.changeLanguage(currLanguage);
		}
		dateLocales[currLanguage]().then(() => {
			dayjs.locale(currLanguage);
		});
	}, [_appLanguage, currLanguage, language]);

	return currLanguage;
}

export default useLocale;
