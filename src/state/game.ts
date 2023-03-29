import { create } from "zustand";
import { produce } from "structurajs";

import { boardActions, useBoardStore } from "./board";
import { newGame, gameMove } from "~/minesweeper";
import { Board, BoardSettings, Game, GameMove } from "~/minesweeper/types";
import { GameLevel } from "~/types";
import { EASY_MODE, MEDIUM_MODE, EXPERT_MODE } from "~/utils/contants";

interface GameState {
	game: Game;
	duration: number;
	startedAt: number;
	gameLevel: GameLevel;
}
interface GameActions {
	newGame: (gameLevel: GameLevel) => void;
	newCustomGame: (settings: BoardSettings) => void;
	resetGame: () => void;
	handleMove: (move: GameMove, board: Board) => void;
	setDuration: (duration: number) => void;
	setStartedAt: (startedAt: number) => void;
}

export const useGameStore = create<GameState>(() => ({
	game: newGame(EASY_MODE.mines),
	duration: 0,
	startedAt: 0,
	gameLevel: GameLevel.Easy,
}));

export const gameActions: GameActions = {
	newGame: (gameLevel) => {
		if (gameLevel === GameLevel.Custom) {
			useGameStore.setState({
				gameLevel: GameLevel.Custom,
			});
			return;
		}
		let settings = EASY_MODE;
		if (gameLevel === GameLevel.Medium) {
			settings = MEDIUM_MODE;
		}
		if (gameLevel === GameLevel.Expert) {
			settings = EXPERT_MODE;
		}
		boardActions.newBoard(settings);
		useGameStore.setState({
			game: newGame(settings.mines),
			duration: 0,
			startedAt: 0,
			gameLevel: gameLevel,
		});
	},

	newCustomGame: (settings) => {
		boardActions.newBoard(settings);
		useGameStore.setState({
			game: newGame(settings.mines),
			duration: 0,
			startedAt: 0,
			gameLevel: GameLevel.Custom,
		});
	},

	resetGame: () => {
		const board = useBoardStore.getState().board;
		useGameStore.setState((state) => {
			boardActions.newBoard({
				rows: board.length,
				cols: board[0].length,
				mines: state.game.minesCount,
			});
			return {
				game: newGame(state.game.minesCount),
				duration: 0,
				startedAt: 0,
			};
		});
	},

	handleMove: (move, board) => {
		useGameStore.setState((state) => {
			return produce(state, (draft) => {
				gameMove(move, draft.game, board);
			});
		});
	},

	setDuration: (duration) => {
		useGameStore.setState({ duration });
	},

	setStartedAt: (startedAt) => {
		useGameStore.setState({ startedAt });
	},
};
