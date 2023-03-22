import { BoardSettings, Board, Cell, BoardCell } from "./types";

export function newBoard(settings: BoardSettings): Board {
	const board: Board = {
		matrix: generateEmptyBoard(settings.rows, settings.cols),
		opened: [],
	};
	const minesCoords = generateMinesCoords(settings);
	minesCoords.forEach(([row, col]) => {
		board.matrix[row][col] = Cell.Mine;
	});
	board.matrix.forEach((row, rowIndex) => {
		row.forEach((cell, colIndex) => {
			if (cell === Cell.Mine) return;
			const minesCount = getCellMinesCount(rowIndex, colIndex, board.matrix);
			if (minesCount > 0) {
				board.matrix[rowIndex][colIndex] = minesCount;
			}
		});
	});
	return board;
}

function getCellMinesCount(
	rowIndex: number,
	colIndex: number,
	matrix: BoardCell[][],
): number {
	let minesCount = 0;
	let coords: [number, number][] = [];
	for (let row = rowIndex - 1; row <= rowIndex + 1; row++) {
		for (let col = colIndex - 1; col <= colIndex + 1; col++) {
			if (row < 0 || col < 0) continue;
			if (row >= matrix.length || row >= matrix[0]?.length) continue;
			if (row === rowIndex && col === colIndex) continue;
			coords.push([row, col]);
		}
	}
	coords.forEach(([row, col]) => {
		if (matrix[row][col] === Cell.Mine) {
			minesCount++;
		}
	});
	return minesCount;
}

function generateEmptyBoard(rows: number, cols: number): Cell.Blank[][] {
	const matrix = new Array(rows);
	for (let index = 0; index < matrix.length; index++) {
		matrix[index] = new Array(cols).fill(Cell.Blank);
	}
	return matrix;
}

function generateMinesCoords(settings: BoardSettings): [number, number][] {
	const minesMap: { [key: string]: boolean } = {};
	const mines: [number, number][] = [];
	while (mines.length < settings.mines) {
		const rowIndex = getRandomIndex(settings.rows);
		const colIndex = getRandomIndex(settings.cols);
		const minesMapKey = `${rowIndex}-${colIndex}`;
		if (!minesMap[minesMapKey]) {
			minesMap[minesMapKey] = true;
			mines.push([rowIndex, colIndex]);
		}
	}
	return mines;
}

function getRandomIndex(len: number): number {
	return Math.floor(Math.random() * len);
}

export const testingOnly = {
	getCellMinesCount,
	generateEmptyBoard,
	generateMinesCoords,
	getRandomIndex,
};
