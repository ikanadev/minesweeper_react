import { newGame } from "./newGame";
import { Status } from "./types";

describe("game creation", () => {
	it("should create with correct settings", () => {
		const game = newGame(8);
		expect(game.flaggedMap).toEqual({});
		expect(game.openedMap).toEqual({});
		expect(game.status).toStrictEqual(Status.Started);
		expect(game.minesCount).toStrictEqual(8);
	});
});
