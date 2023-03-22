import { testingOnly, newBoard } from "./newBoard";
import { Cell, Status } from "./types";

const {
	getRandomIndex,
	generateMinesCoords,
	generateEmptyBoard,
	getCellMinesCount,
} = testingOnly;

describe("Create board", () => {
	it("generate random index", () => {
		let indexes = [getRandomIndex(1), getRandomIndex(1), getRandomIndex(1)];
		expect(indexes).toEqual([0, 0, 0]);
		indexes = [
			getRandomIndex(2),
			getRandomIndex(2),
			getRandomIndex(2),
			getRandomIndex(2),
		];
		indexes.forEach((index) => {
			expect(index).toBeGreaterThanOrEqual(0);
			expect(index).toBeLessThanOrEqual(1);
		});
		indexes = [
			getRandomIndex(30),
			getRandomIndex(30),
			getRandomIndex(30),
			getRandomIndex(30),
		];
		indexes.forEach((index) => {
			expect(index).toBeGreaterThanOrEqual(0);
			expect(index).toBeLessThanOrEqual(29);
		});
	});

	it("generate mines coords for small board", () => {
		let minesCoords = generateMinesCoords({ rows: 2, cols: 2, mines: 4 });
		expect(minesCoords.length).toStrictEqual(4);
		let set = new Set<string>();
		minesCoords.forEach(([row, col]) => {
			set.add(`${row}-${col}`);
		});
		expect(set.size, "unique indexes").toStrictEqual(4);
	});

	it("generate mines coords for big board", () => {
		let minesCoords = generateMinesCoords({ rows: 50, cols: 50, mines: 2000 });
		expect(minesCoords.length).toStrictEqual(2000);
		let set = new Set<string>();
		minesCoords.forEach(([row, col]) => {
			set.add(`${row}-${col}`);
		});
		expect(set.size, "unique indexes").toStrictEqual(2000);
	});

	it.each([
		{ rows: 0, cols: 0, expected: [] },
		{
			rows: 2,
			cols: 3,
			expected: [
				[Cell.Blank, Cell.Blank, Cell.Blank],
				[Cell.Blank, Cell.Blank, Cell.Blank],
			],
		},
		{
			rows: 3,
			cols: 3,
			expected: [
				[Cell.Blank, Cell.Blank, Cell.Blank],
				[Cell.Blank, Cell.Blank, Cell.Blank],
				[Cell.Blank, Cell.Blank, Cell.Blank],
			],
		},
	])(
		"Empty boars for $rows rows and $cols cols",
		({ rows, cols, expected }) => {
			expect(generateEmptyBoard(rows, cols)).toEqual(expected);
		},
	);

	const board: Cell[][] = [
		[Cell.Blank, Cell.Mine, Cell.Blank, Cell.Blank, Cell.Mine, Cell.Blank],
		[Cell.Blank, Cell.Blank, Cell.Mine, Cell.Mine, Cell.Blank, Cell.Mine],
		[Cell.Blank, Cell.Mine, Cell.Blank, Cell.Mine, Cell.Blank, Cell.Mine],
		[Cell.Blank, Cell.Blank, Cell.Mine, Cell.Mine, Cell.Mine, Cell.Mine],
		[Cell.Blank, Cell.Mine, Cell.Blank, Cell.Mine, Cell.Blank, Cell.Mine],
		[Cell.Blank, Cell.Mine, Cell.Mine, Cell.Mine, Cell.Mine, Cell.Mine],
	];
	it.each([
		{ row: 0, col: 0, expected: 1 },
		{ row: 0, col: 2, expected: 3 },
		{ row: 0, col: 3, expected: 3 },
		{ row: 0, col: 5, expected: 2 },
		{ row: 1, col: 0, expected: 2 },
		{ row: 1, col: 1, expected: 3 },
		{ row: 1, col: 4, expected: 5 },
		{ row: 2, col: 0, expected: 1 },
		{ row: 2, col: 2, expected: 6 },
		{ row: 2, col: 4, expected: 7 },
		{ row: 3, col: 0, expected: 2 },
		{ row: 3, col: 1, expected: 3 },
		{ row: 4, col: 0, expected: 2 },
		{ row: 4, col: 2, expected: 7 },
		{ row: 4, col: 4, expected: 8 },
		{ row: 5, col: 0, expected: 2 },
	])("mines count for [$row,$col] = $expected", ({ row, col, expected }) => {
		expect(getCellMinesCount(row, col, board)).toStrictEqual(expected);
	});

	it("generate correct board", () => {
		const matrix = newBoard({ rows: 5, cols: 7, mines: 10 });
		expect(matrix).toHaveLength(5);
		expect(matrix[0]).toHaveLength(7);
	});
});
