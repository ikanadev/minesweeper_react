import { create } from "zustand";
import {
	I18nLabels,
	englishLabels,
	spanishLabels,
	Language,
} from "~/translations";

interface I18nState {
	i18n: I18nLabels;
	lang: Language;
}
interface I18nActions {
	setLanguage: (lang: Language) => void;
}

export const useI18nStore = create<I18nState>(() => ({
	i18n: englishLabels,
	lang: Language.English,
}));

export const i18nActions: I18nActions = {
	setLanguage: (lang) => {
		if (lang === Language.Spanish) {
			useI18nStore.setState({ lang, i18n: spanishLabels });
		}
		if (lang === Language.English) {
			useI18nStore.setState({ lang, i18n: englishLabels });
		}
	},
};
