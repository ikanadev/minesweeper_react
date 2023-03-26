export enum Language {
	Spanish,
	English,
}

export type I18nLabels = {
	levelLabel: string;
	level: {
		easy: string;
		medium: string;
		expert: string;
		custom: string;
	};
	customLevelPlay: string;
	customLevel: {
		rows: string;
		cols: string;
		mines: string;
	};
	customLevelErrors: {
		notNumber: string;
		invalidRowColRange: string;
		invalidMinesRange: (max: number, min: number) => string;
	};
};
