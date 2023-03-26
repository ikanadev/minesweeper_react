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
	useEnglish: () => void;
	useSpanish: () => void;
}

export const useI18nStore = create<I18nState>()((set) => ({
	i18n: englishLabels,
	lang: Language.English,
	useEnglish: () => set({ i18n: englishLabels, lang: Language.English }),
	useSpanish: () => set({ i18n: spanishLabels, lang: Language.Spanish }),
}));
