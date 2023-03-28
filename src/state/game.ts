import { create } from "zustand";
import { produce } from "structurajs";
import { newGame, gameMove } from "~/minesweeper";
import { Board, Game, GameMove } from "~/minesweeper/types";

interface GameState {
	game: Game;
	duration: number;
	startedAt: number;
	startGame: (mines: number) => void;
	handleMove: (data: GameMove, board: Board) => void;
	setDuration: (duration: number) => void;
	setStartedAt: (start: number) => void;
}

export const useGameStore = create<GameState>()((set) => ({
	game: newGame(0),
	duration: 0,
	startedAt: 0,
	startGame: (mines) => set({ game: newGame(mines) }),
	handleMove: (move, board) =>
		set((state) => {
			return produce(state, (draft) => {
				gameMove(move, draft.game, board);
			});
		}),
	setDuration: (duration) => set({ duration }),
	setStartedAt: (startedAt) => set({ startedAt }),
}));
