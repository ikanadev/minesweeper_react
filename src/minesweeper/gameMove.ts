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
	game.openedMap[cellMapIndex] = true;
	if (board[move.row][move.col] === Cell.Blank) {
		let indexesToCheck: [number, number][] = [];
		for (let i = move.row - 1; i <= move.row + 1; i++) {
			for (let j = move.col - 1; j <= move.col + 1; j++) {
				if (i < 0 || j < 0) continue;
				if (i >= board.length || j >= board[0]?.length) continue;
				if (i === move.row && j === move.col) continue;
				if (game.openedMap[`${i}-${j}`]) {
					continue;
				}
				indexesToCheck.push([i, j]);
			}
		}
		indexesToCheck.forEach(([row, col]) => {
			const newMove = { ...move, row, col };
			handleOpenCell(newMove, game, board);
		});
	}
	checkAndHandleGameWin(game, board);
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
