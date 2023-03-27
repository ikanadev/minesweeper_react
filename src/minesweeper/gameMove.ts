import {
	Board,
	Status,
	Game,
	GameMove,
	Click,
	CellMapIndex,
	Cell,
} from "./types";

export function gameMove(move: GameMove, game: Game, board: Board) {
	if (game.status === Status.Lose) return;
	if (move.click === Click.Right) {
		handleFlagCell(move, game);
		return;
	}
	handleOpenCell(move, game, board);
}

function handleFlagCell(move: GameMove, game: Game) {
	const cellMapIndex: CellMapIndex = `${move.row}-${move.col}`;
	// if cell is opened, we can not flag it
	if (game.openedMap[cellMapIndex]) {
		return;
	}
	if (game.flaggedMap[cellMapIndex]) {
		// rome-ignore lint/performance/noDelete: <explanation>
		delete game.flaggedMap[cellMapIndex];
	} else {
		game.flaggedMap[cellMapIndex] = true;
	}
}

function handleOpenCell(move: GameMove, game: Game, board: Board) {
	const cellMapIndex: CellMapIndex = `${move.row}-${move.col}`;
	// if opened or flagged, do nothing
	if (game.openedMap[cellMapIndex] || game.flaggedMap[cellMapIndex]) {
		return;
	}
	if (board[move.row][move.col] === Cell.Mine) {
		handleLose(game, board);
		return;
	}
	let nearByBlanks = getNearbyBlanks(move.row, move.col, game, board);
	while (nearByBlanks.length > 0) {
		const newBlanks: [number, number][] = [];
		nearByBlanks.forEach(([row, col]) => {
			newBlanks.push(...getNearbyBlanks(row, col, game, board));
		});
		nearByBlanks = newBlanks;
	}
	checkAndHandleGameWin(game, board);
}

function getNearbyBlanks(
	row: number,
	col: number,
	game: Game,
	board: Board,
): [number, number][] {
	openCell(game, row, col);
	if (typeof board[row][col] === "number") {
		return [];
	}
	const nearbyBlanks: [number, number][] = [];
	for (let i = row - 1; i <= row + 1; i++) {
		for (let j = col - 1; j <= col + 1; j++) {
			if (
				game.openedMap[`${i}-${j}`] ||
				i < 0 ||
				j < 0 ||
				i >= board.length ||
				j >= board[0]?.length ||
				(i === row && j === col)
			)
				continue;
			openCell(game, i, j);
			if (board[i][j] === Cell.Blank) {
				nearbyBlanks.push([i, j]);
			}
		}
	}
	return nearbyBlanks;
}

function handleLose(game: Game, board: Board) {
	game.status = Status.Lose;
	const toOpen: [number, number][] = [];
	board.forEach((row, rowIdx) => {
		row.forEach((cell, colIdx) => {
			if (cell === Cell.Mine && !game.openedMap[`${rowIdx}-${colIdx}`]) {
				toOpen.push([rowIdx, colIdx]);
			}
		});
	});
	toOpen.forEach(([row, col]) => {
		openCell(game, row, col);
	});
}

function openCell(game: Game, row: number, col: number) {
	game.openedMap[`${row}-${col}`] = true;
}

function checkAndHandleGameWin(game: Game, board: Board) {
	const totalCells = board.length * board[0]?.length;
	const remainingCells = totalCells - Object.keys(game.openedMap).length;
	if (game.minesCount !== remainingCells) return;
	game.status = Status.Win;
	const toFlag: [number, number][] = [];
	board.forEach((row, rowIdx) => {
		row.forEach((cell, colIdx) => {
			if (cell === Cell.Mine && !game.flaggedMap[`${rowIdx}-${colIdx}`]) {
				toFlag.push([rowIdx, colIdx]);
			}
		});
	});
	toFlag.forEach(([row, col]) => {
		game.flaggedMap[`${row}-${col}`] = true;
	});
}
