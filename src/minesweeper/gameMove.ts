import {
	Board,
	Status,
	Game,
	GameMove,
	Click,
	CellMapIndex,
	Cell,
} from "./types";

export function gameMove(move: GameMove, board: Board) {
	if (move.click === Click.Right) {
		handleFlagCell(move);
		return;
	}
	handleOpenCell(move, board);
}

function handleFlagCell(move: GameMove) {
	const cellMapIndex: CellMapIndex = `${move.row}-${move.col}`;
	// if cell is opened, we can not flag it
	if (move.game.openedMap[cellMapIndex]) {
		move.game;
		return;
	}
	if (move.game.flaggedMap[cellMapIndex]) {
		// rome-ignore lint/performance/noDelete: <explanation>
		delete move.game.flaggedMap[cellMapIndex];
	} else {
		move.game.flaggedMap[cellMapIndex] = true;
	}
}

function handleOpenCell(move: GameMove, board: Board) {
	const cellMapIndex: CellMapIndex = `${move.row}-${move.col}`;
	if (move.game.openedMap[cellMapIndex]) {
		return;
	}
	move.game.openedMap[cellMapIndex] = true;
	if (board[move.row][move.col] === Cell.Mine) {
		move.game.status = Status.Lose;
		return;
	}
	if (board[move.row][move.col] === Cell.Blank) {
		let indexesToCheck: [number, number][] = [];
		for (let i = move.row - 1; i <= move.row + 1; i++) {
			for (let j = move.col - 1; j <= move.col + 1; j++) {
				if (i < 0 || j < 0) continue;
				if (i >= board.length || j >= board[0]?.length) continue;
				if (i === move.row && j === move.col) continue;
				if (move.game.openedMap[`${i}-${j}`]) {
					continue;
				}
				indexesToCheck.push([i, j]);
			}
		}
		indexesToCheck.forEach(([row, col]) => {
			const newMove = { ...move, row, col };
			handleOpenCell(newMove, board);
		});
	}
	checkGameWin(move.game, board);
}

function checkGameWin(game: Game, board: Board) {
	const remainingCells =
		board.length * board[0]?.length - Object.keys(game.openedMap).length;
	if (game.minesCount === remainingCells) {
		game.status = Status.Win;
	}
}
