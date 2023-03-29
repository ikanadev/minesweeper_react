import { I18nLabels } from "./types";
import { BOARD_MAX_SIZE, BOARD_MIN_SIZE } from "~/utils/contants";

export const englishLabels: I18nLabels = {
	levelLabel: "Pick level:",
	level: {
		easy: "Easy",
		medium: "Medium",
		expert: "Expert",
		custom: "Custom",
	},
	customLevelPlay: "Play",
	customLevel: {
		rows: "Rows",
		cols: "Columns",
		mines: "Mines",
	},
	customLevelErrors: {
		notNumber: "Only numbers are allowed",
		invalidRowColRange: `Rows and cols should be between ${BOARD_MIN_SIZE} and ${BOARD_MAX_SIZE}`,
		invalidMinesRange: (max, min) =>
			`Mines for this board size should be between ${min} and ${max}`,
	},
	gameStatus: {
		ready: "Start whenever you want",
		started: "🫡 Good luck",
		win: "🥳 Well done! 🎉",
		lose: "😥 Oh no!",
	},
	restartGame: "Start again",
	noRecords: "No records yet.",
	bestRecords: "Best records",
};
