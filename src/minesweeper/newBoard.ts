import { BoardSettings, Board, Cell, BoardCell } from "./types";

export function newBoard(settings: BoardSettings): Board {
	const matrix: BoardCell[][] = generateEmptyBoard(
		settings.rows,
		settings.cols,
	);
	const minesCoords = generateMinesCoords(settings);
	minesCoords.forEach(([row, col]) => {
		matrix[row][col] = Cell.Mine;
	});
	matrix.forEach((row, rowIndex) => {
		row.forEach((cell, colIndex) => {
			if (cell === Cell.Mine) return;
			const minesCount = getCellMinesCount(rowIndex, colIndex, matrix);
			if (minesCount > 0) {
				matrix[rowIndex][colIndex] = minesCount;
			}
		});
	});
	return matrix;
}

function getCellMinesCount(
	rowIndex: number,
	colIndex: number,
	matrix: BoardCell[][],
): number {
	let minesCount = 0;
	for (let row = rowIndex - 1; row <= rowIndex + 1; row++) {
		for (let col = colIndex - 1; col <= colIndex + 1; col++) {
			if (
				row < 0 ||
				col < 0 ||
				row >= matrix.length ||
				col >= matrix[0]?.length ||
				(row === rowIndex && col === colIndex)
			)
				continue;
			if (matrix[row][col] === Cell.Mine) {
				minesCount++;
			}
		}
	}
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
