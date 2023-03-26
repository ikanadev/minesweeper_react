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
			`Mines should be between ${min} and ${max}`,
	},
};
