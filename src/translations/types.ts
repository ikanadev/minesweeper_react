export enum Language {
	Spanish = "spanish",
	English = "english",
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
	gameStatus: {
		ready: string;
		started: string;
		win: string;
		lose: string;
	};
	restartGame: string;
	noRecords: string;
	bestRecords: string;
	recordModal: {
		title: string;
		description: string;
		placeholder: string;
		saveButton: string;
		cancelButton: string;
	};
};
