import { Game, Status } from "./types";

export function newGame(minesCount: number): Game {
	return {
		openedMap: {},
		flaggedMap: {},
		status: Status.Started,
		minesCount,
	};
}
