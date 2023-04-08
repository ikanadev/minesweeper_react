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
	if (game.status === Status.Ready) {
		game.status = Status.Started;
	}
	if (game.status === Status.Lose || game.status === Status.Win) return;
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
		delete game.flaggedMap[cellMapIndex];
	} else {
		if (Object.keys(game.flaggedMap).length >= game.minesCount) return;
		game.flaggedMap[cellMapIndex] = true;
	}
}

function handleOpenCell(move: GameMove, game: Game, board: Board) {
	const cellMapIndex: CellMapIndex = `${move.row}-${move.col}`;
	// if flagged, do nothing
	if (game.flaggedMap[cellMapIndex]) {
		return;
	}
	if (game.openedMap[cellMapIndex]) {
		// if opened but is blank, do nothing
		if (board[move.row][move.col] === Cell.Blank) return;
		handleChord(move.row, move.col, game, board);
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

function handleChord(row: number, col: number, game: Game, board: Board) {
	const cell = board[row][col];
	if (typeof cell !== "number") return;
	let flagsCount = 0;
	let validChord = true;
	for (let i = row - 1; i <= row + 1; i++) {
		for (let j = col - 1; j <= col + 1; j++) {
			if (
				i < 0 ||
				j < 0 ||
				i >= board.length ||
				j >= board[0]?.length ||
				(i === row && j === col)
			) {
				continue;
			}
			if (board[i][j] === Cell.Mine) {
				if (!game.flaggedMap[`${i}-${j}`]) {
					validChord = false;
				}
			}
			if (game.flaggedMap[`${i}-${j}`]) {
				flagsCount++;
			}
		}
	}
	// if flags is different from the number hint, do nothing
	if (flagsCount !== cell) {
		return;
	}
	if (!validChord) {
		handleLose(game, board);
		return;
	}
	let blanks: [number, number][] = [];
	// handle chrod move
	for (let i = row - 1; i <= row + 1; i++) {
		for (let j = col - 1; j <= col + 1; j++) {
			if (
				i < 0 ||
				j < 0 ||
				i >= board.length ||
				j >= board[0]?.length ||
				(i === row && j === col)
			) {
				continue;
			}
			if (!game.openedMap[`${i}-${j}`] && !game.flaggedMap[`${i}-${j}`]) {
				openCell(game, i, j);
				if (board[i][j] === Cell.Blank) {
					blanks.push([i, j]);
				}
			}
		}
	}
	while (blanks.length > 0) {
		const newBlanks: [number, number][] = [];
		blanks.forEach(([row, col]) => {
			newBlanks.push(...getNearbyBlanks(row, col, game, board));
		});
		blanks = newBlanks;
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
