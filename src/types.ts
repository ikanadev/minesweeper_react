import { Game, Board } from "~/minesweeper/types";

export type Record = {
	id: string;
	game: Game;
	board: Board;
	startedAt: number;
	duration: number;
	name: string;
};

export enum GameLevel {
	Easy = "easy",
	Medium = "medium",
	Expert = "expert",
	Custom = "custom",
}

export type RecordsMap = {
	[GameLevel.Easy]: Record[];
	[GameLevel.Medium]: Record[];
	[GameLevel.Expert]: Record[];
};
