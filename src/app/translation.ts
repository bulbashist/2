import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./translations/en/en.json";
import ruTranslation from "./translations/ru/ru.json";
import { store } from "./store/store";
import { Language } from "./translations/types";

export const initTranslation = () => {
  const lng = store.getState().core.lang;

  return i18next.use(initReactI18next).init({
    resources: {
      en: enTranslation,
      ru: ruTranslation,
    },
    lng,
    fallbackLng: Language.English,
  });
};

export default i18next;
