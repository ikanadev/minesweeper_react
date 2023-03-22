export type Board = {
	matrix: BoardCell[][];
	opened: [number, number][];
};

export type BoardSettings = {
	rows: number;
	cols: number;
	mines: number;
};

export type BoardCell = number | Cell;

export enum Cell {
	Blank = "B",
	Mine = "M",
}

export enum BoarStatus {
	Win,
	Lose,
}
