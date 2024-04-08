import { useEffect } from "react";
import i18n from "i18next";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import { LocaleType, dateLocales } from "@/app-core/locale";

import { appLanguage } from "@/features/locale/locale.slice";

function useLocale(language?: LocaleType) {

  const _appLanguage = useSelector(appLanguage);
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
