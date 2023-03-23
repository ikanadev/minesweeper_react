import { Board, Cell, Status, CellMap, Game, Click } from "./types";
import { gameMove } from "./gameMove";

function dummyGame({
	flagged,
	opened,
	status,
	mines,
}: {
	flagged: `${number}-${number}`[];
	opened: `${number}-${number}`[];
	status: Status;
	mines: number;
}): Game {
	const flaggedMap: CellMap = {};
	const openedMap: CellMap = {};
	flagged.forEach((fc) => {
		flaggedMap[fc] = true;
	});
	opened.forEach((oc) => {
		openedMap[oc] = true;
	});
	return {
		flaggedMap,
		openedMap,
		status,
		minesCount: mines,
	};
}

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
	let board: Board = [
		[B, B, 1, 1, 1],
		[1, 2, 4, M, 2],
		[1, M, M, M, 2],
		[2, 3, 3, 2, 1],
		[M, 1, B, B, B],
	];
	it.each([
		{
			row: 0,
			col: 1,
			click: Click.Left,
			game: dummyGame({
				flagged: [],
				opened: [],
				status: Status.Started,
				mines: 5,
			}),
			expected: dummyGame({
				flagged: [],
				opened: ["0-0", "0-1", "0-2", "1-0", "1-1", "1-2"],
				status: Status.Started,
				mines: 5,
			}),
		},
		{
			row: 2,
			col: 4,
			click: Click.Left,
			game: dummyGame({
				flagged: [],
				opened: ["0-0", "0-1", "0-2", "1-0", "1-1", "1-2"],
				status: Status.Started,
				mines: 5,
			}),
			expected: dummyGame({
				flagged: [],
				opened: ["0-0", "0-1", "0-2", "1-0", "1-1", "1-2", "2-4"],
				status: Status.Started,
				mines: 5,
			}),
		},
		{
			row: 4,
			col: 4,
			click: Click.Left,
			game: dummyGame({
				flagged: [],
				opened: ["0-0", "0-1", "0-2", "1-0", "1-1", "1-2", "2-4"],
				status: Status.Started,
				mines: 5,
			}),
			expected: dummyGame({
				flagged: [],
				opened: [
					"0-0",
					"0-1",
					"0-2",
					"1-0",
					"1-1",
					"1-2",
					"2-4",
					"3-1",
					"3-2",
					"3-3",
					"3-4",
					"4-1",
					"4-2",
					"4-3",
					"4-4",
				],
				status: Status.Started,
				mines: 5,
			}),
		},
		{
			row: 2,
			col: 3,
			click: Click.Right,
			game: dummyGame({
				flagged: [],
				opened: [
					"0-0",
					"0-1",
					"0-2",
					"1-0",
					"1-1",
					"1-2",
					"2-4",
					"3-1",
					"3-2",
					"3-3",
					"3-4",
					"4-1",
					"4-2",
					"4-3",
					"4-4",
				],
				status: Status.Started,
				mines: 5,
			}),
			expected: dummyGame({
				flagged: ["2-3"],
				opened: [
					"0-0",
					"0-1",
					"0-2",
					"1-0",
					"1-1",
					"1-2",
					"2-4",
					"3-1",
					"3-2",
					"3-3",
					"3-4",
					"4-1",
					"4-2",
					"4-3",
					"4-4",
				],
				status: Status.Started,
				mines: 5,
			}),
		},
		{
			row: 2,
			col: 0,
			click: Click.Left,
			game: dummyGame({
				flagged: ["2-3"],
				opened: [
					"0-0",
					"0-1",
					"0-2",
					"1-0",
					"1-1",
					"1-2",
					"2-4",
					"3-1",
					"3-2",
					"3-3",
					"3-4",
					"4-1",
					"4-2",
					"4-3",
					"4-4",
				],
				status: Status.Started,
				mines: 5,
			}),
			expected: dummyGame({
				flagged: ["2-3"],
				opened: [
					"0-0",
					"0-1",
					"0-2",
					"1-0",
					"1-1",
					"1-2",
					"2-4",
					"3-1",
					"3-2",
					"3-3",
					"3-4",
					"4-1",
					"4-2",
					"4-3",
					"4-4",
					"2-0",
				],
				status: Status.Started,
				mines: 5,
			}),
		},
		{
			row: 3,
			col: 0,
			click: Click.Left,
			game: dummyGame({
				flagged: ["2-3"],
				opened: [
					"0-0",
					"0-1",
					"0-2",
					"1-0",
					"1-1",
					"1-2",
					"2-4",
					"3-1",
					"3-2",
					"3-3",
					"3-4",
					"4-1",
					"4-2",
					"4-3",
					"4-4",
					"2-0",
				],
				status: Status.Started,
				mines: 5,
			}),
			expected: dummyGame({
				flagged: ["2-3"],
				opened: [
					"0-0",
					"0-1",
					"0-2",
					"1-0",
					"1-1",
					"1-2",
					"2-4",
					"3-1",
					"3-2",
					"3-3",
					"3-4",
					"4-1",
					"4-2",
					"4-3",
					"4-4",
					"2-0",
					"3-0",
				],
				status: Status.Started,
				mines: 5,
			}),
		},
		{
			row: 4,
			col: 0,
			click: Click.Right,
			game: dummyGame({
				flagged: ["2-3"],
				opened: [
					"0-0",
					"0-1",
					"0-2",
					"1-0",
					"1-1",
					"1-2",
					"2-4",
					"3-1",
					"3-2",
					"3-3",
					"3-4",
					"4-1",
					"4-2",
					"4-3",
					"4-4",
					"2-0",
					"3-0",
				],
				status: Status.Started,
				mines: 5,
			}),
			expected: dummyGame({
				flagged: ["2-3", "4-0"],
				opened: [
					"0-0",
					"0-1",
					"0-2",
					"1-0",
					"1-1",
					"1-2",
					"2-4",
					"3-1",
					"3-2",
					"3-3",
					"3-4",
					"4-1",
					"4-2",
					"4-3",
					"4-4",
					"2-0",
					"3-0",
				],
				status: Status.Started,
				mines: 5,
			}),
		},
		{
			row: 0,
			col: 4,
			click: Click.Left,
			game: dummyGame({
				flagged: ["2-3", "4-0"],
				opened: [
					"0-0",
					"0-1",
					"0-2",
					"1-0",
					"1-1",
					"1-2",
					"2-4",
					"3-1",
					"3-2",
					"3-3",
					"3-4",
					"4-1",
					"4-2",
					"4-3",
					"4-4",
					"2-0",
					"3-0",
				],
				status: Status.Started,
				mines: 5,
			}),
			expected: dummyGame({
				flagged: ["2-3", "4-0"],
				opened: [
					"0-0",
					"0-1",
					"0-2",
					"1-0",
					"1-1",
					"1-2",
					"2-4",
					"3-1",
					"3-2",
					"3-3",
					"3-4",
					"4-1",
					"4-2",
					"4-3",
					"4-4",
					"2-0",
					"3-0",
					"0-4",
				],
				status: Status.Started,
				mines: 5,
			}),
		},
		{
			row: 1,
			col: 4,
			click: Click.Left,
			game: dummyGame({
				flagged: ["2-3", "4-0"],
				opened: [
					"0-0",
					"0-1",
					"0-2",
					"1-0",
					"1-1",
					"1-2",
					"2-4",
					"3-1",
					"3-2",
					"3-3",
					"3-4",
					"4-1",
					"4-2",
					"4-3",
					"4-4",
					"2-0",
					"3-0",
					"0-4",
				],
				status: Status.Started,
				mines: 5,
			}),
			expected: dummyGame({
				flagged: ["2-3", "4-0"],
				opened: [
					"0-0",
					"0-1",
					"0-2",
					"1-0",
					"1-1",
					"1-2",
					"2-4",
					"3-1",
					"3-2",
					"3-3",
					"3-4",
					"4-1",
					"4-2",
					"4-3",
					"4-4",
					"2-0",
					"3-0",
					"0-4",
					"1-4",
				],
				status: Status.Started,
				mines: 5,
			}),
		},
		{
			row: 0,
			col: 3,
			click: Click.Left,
			game: dummyGame({
				flagged: ["2-3", "4-0"],
				opened: [
					"0-0",
					"0-1",
					"0-2",
					"1-0",
					"1-1",
					"1-2",
					"2-4",
					"3-1",
					"3-2",
					"3-3",
					"3-4",
					"4-1",
					"4-2",
					"4-3",
					"4-4",
					"2-0",
					"3-0",
					"0-4",
					"1-4",
				],
				status: Status.Started,
				mines: 5,
			}),
			expected: dummyGame({
				flagged: ["2-3", "4-0"],
				opened: [
					"0-0",
					"0-1",
					"0-2",
					"1-0",
					"1-1",
					"1-2",
					"2-4",
					"3-1",
					"3-2",
					"3-3",
					"3-4",
					"4-1",
					"4-2",
					"4-3",
					"4-4",
					"2-0",
					"3-0",
					"0-4",
					"1-4",
					"0-3",
				],
				status: Status.Win,
				mines: 5,
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
