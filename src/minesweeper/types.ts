export type Game = {
	status: Status;
	openedMap: CellMap;
	flaggedMap: CellMap;
	minesCount: number;
};
export type GameMove = {
	row: number;
	col: number;
	game: Game;
	click: Click;
};

export type BoardSettings = {
	rows: number;
	cols: number;
	mines: number;
};

export type Board = BoardCell[][];
export type BoardCell = number | Cell;
export type CellMapIndex = `${number}-${number}`;
export type CellMap = { [key: CellMapIndex]: boolean };

export enum Click {
	Right = "Right",
	Left = "Left",
}

export enum Cell {
	Blank = "B",
	Mine = "M",
}

export enum Status {
	Win,
	Lose,
	Started,
}
