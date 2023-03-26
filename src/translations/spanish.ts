import { I18nLabels } from "./types";
import { BOARD_MAX_SIZE, BOARD_MIN_SIZE } from "~/utils/contants";

export const spanishLabels: I18nLabels = {
	levelLabel: "Seleccionar nivel:",
	level: {
		easy: "Fácil",
		medium: "Medio",
		expert: "Difícil",
		custom: "Personalizado",
	},
	customLevelPlay: "Jugar",
	customLevel: {
		rows: "Filas",
		cols: "Columnas",
		mines: "Minas",
	},
	customLevelErrors: {
		notNumber: "Ingresa números válidos",
		invalidRowColRange: `Las filas y columnas deben estar entre ${BOARD_MIN_SIZE} y ${BOARD_MAX_SIZE}`,
		invalidMinesRange: (max, min) =>
			`El nro de minas debe estar entre ${min} y ${max}`,
	},
};
