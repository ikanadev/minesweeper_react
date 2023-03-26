import { BoardSettings } from "~/minesweeper/types";

export const EASY_MODE: BoardSettings = {
	rows: 9,
	cols: 9,
	mines: 10,
};

export const MEDIUM_MODE: BoardSettings = {
	rows: 16,
	cols: 16,
	mines: 40,
};

export const EXPERT_MODE: BoardSettings = {
	rows: 16,
	cols: 30,
	mines: 99,
};

export const BOARD_MAX_SIZE = 60;
export const BOARD_MIN_SIZE = 5;
