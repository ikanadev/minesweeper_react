import { Board, Cell, Status, CellMap, Game, Click } from "./types";
import { gameMove } from "./gameMove";

import {
	simpleGameBoard,
	lostGameTests,
	wonGameTests,
	flagGameTests,
	completeGameplayTests,
	completeGameplayBoard,
} from "./gameMoveTestUtils";

const M = Cell.Mine;
const B = Cell.Blank;

describe("Lost game", () => {
	it.each(lostGameTests)("Game move: $move", ({ move, game, expected }) => {
		gameMove(move, game, simpleGameBoard);
		expect(game).toEqual(expected);
	});
});

describe("Won game", () => {
	it.each(wonGameTests)("Game move: $move", ({ move, game, expected }) => {
		gameMove(move, game, simpleGameBoard);
		expect(game).toEqual(expected);
	});
});

describe("Flag cells", () => {
	it.each(flagGameTests)("Game move: $move", ({ move, game, expected }) => {
		gameMove(move, game, simpleGameBoard);
		expect(game).toEqual(expected);
	});
});

describe("Complete gameplay", () => {
	it.each(completeGameplayTests)(
		"Game move: $move",
		({ move, game, expected }) => {
			gameMove(move, game, completeGameplayBoard);
			expect(game).toEqual(expected);
		},
	);
});
