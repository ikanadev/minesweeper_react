import { Game, Status } from "./types";

export function newGame(): Game {
	return {
		openedMap: {},
		flaggedMap: {},
		status: Status.Started,
	};
}
