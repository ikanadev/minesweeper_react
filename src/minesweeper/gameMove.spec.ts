import { Board, Cell, Status, CellMap, Game, Click } from "./types";
import { gameMove } from "./gameMove";

import {
	dummyGame,
	completeGameplayTests,
	completeGameplayBoard,
} from "./gameMoveTestUtils";

const M = Cell.Mine;
const B = Cell.Blank;

describe("Lost game", () => {
	let board: Board = [
		[B, 1, 1],
		[B, 2, M],
		[B, 2, M],
	];
	it.each([
		{
			row: 1,
			col: 2,
			click: Click.Left,
			game: dummyGame({
				flagged: [],
				opened: [],
				status: Status.Started,
				mines: 2,
			}),
			expected: dummyGame({
				flagged: [],
				opened: ["1-2"],
				status: Status.Lose,
				mines: 2,
			}),
		},
	])(
		"Game move: $click click: [$row, $col]",
		({ row, col, click, game, expected }) => {
			gameMove({ row, col, game, click }, board);
			expect(game).toEqual(expected);
		},
	);
});

describe("Won game", () => {
	let board: Board = [
		[B, 1, 1],
		[B, 2, M],
		[B, 2, M],
	];
	it.each([
		{
			row: 0,
			col: 0,
			click: Click.Left,
			game: dummyGame({
				flagged: [],
				opened: [],
				status: Status.Started,
				mines: 2,
			}),
			expected: dummyGame({
				flagged: [],
				opened: ["0-0", "0-1", "1-0", "1-1", "2-0", "2-1"],
				status: Status.Started,
				mines: 2,
			}),
		},
		{
			row: 0,
			col: 2,
			click: Click.Left,
			game: dummyGame({
				flagged: [],
				opened: ["0-0", "0-1", "1-0", "1-1", "2-0", "2-1"],
				status: Status.Started,
				mines: 2,
			}),
			expected: dummyGame({
				flagged: [],
				opened: ["0-0", "0-1", "1-0", "1-1", "2-0", "2-1", "0-2"],
				status: Status.Win,
				mines: 2,
			}),
		},
	])(
		"Game move: $click click: [$row, $col]",
		({ row, col, click, game, expected }) => {
			gameMove({ row, col, game, click }, board);
			expect(game).toEqual(expected);
		},
	);
});

describe("Flag cells", () => {
	let board: Board = [
		[B, 1, 1],
		[B, 2, M],
		[B, 2, M],
	];
	it.each([
		{
			row: 0,
			col: 0,
			click: Click.Right,
			game: dummyGame({
				flagged: [],
				opened: [],
				status: Status.Started,
				mines: 2,
			}),
			expected: dummyGame({
				flagged: ["0-0"],
				opened: [],
				status: Status.Started,
				mines: 2,
			}),
		},
		{
			row: 0,
			col: 0,
			click: Click.Right,
			game: dummyGame({
				flagged: ["0-0"],
				opened: [],
				status: Status.Started,
				mines: 2,
			}),
			expected: dummyGame({
				flagged: [],
				opened: [],
				status: Status.Started,
				mines: 2,
			}),
		},
		{
			row: 0,
			col: 1,
			click: Click.Left,
			game: dummyGame({
				flagged: [],
				opened: [],
				status: Status.Started,
				mines: 2,
			}),
			expected: dummyGame({
				flagged: [],
				opened: ["0-1"],
				status: Status.Started,
				mines: 2,
			}),
		},
		{
			row: 0,
			col: 1,
			click: Click.Right,
			game: dummyGame({
				flagged: [],
				opened: ["0-1"],
				status: Status.Started,
				mines: 2,
			}),
			expected: dummyGame({
				flagged: [],
				opened: ["0-1"],
				status: Status.Started,
				mines: 2,
			}),
		},
	])(
		"Game move: $click click: [$row, $col]",
		({ row, col, click, game, expected }) => {
			gameMove({ row, col, game, click }, board);
			expect(game).toEqual(expected);
		},
	);
});

describe("Complete gameplay", () => {
	it.each(completeGameplayTests)(
		"Game move: $click click: [$row, $col]",
		({ row, col, click, game, expected }) => {
			gameMove({ row, col, game, click }, completeGameplayBoard);
			expect(game).toEqual(expected);
		},
	);
});
