export type Game = {
	status: Status;
	openedMap: CellMap;
	flaggedMap: CellMap;
};

export type BoardSettings = {
	rows: number;
	cols: number;
	mines: number;
};

export type Board = BoardCell[][];
export type BoardCell = number | Cell;
export type CellMap = { [key: `${number}-${number}`]: boolean };

export enum Cell {
	Blank = "B",
	Mine = "M",
}

export enum Status {
	Win,
	Lose,
	Started,
}
