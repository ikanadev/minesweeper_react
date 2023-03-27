import { create } from "zustand";
import { produce } from "structurajs";
import { newGame, gameMove } from "~/minesweeper";
import { Board, Game, GameMove } from "~/minesweeper/types";

interface GameState {
	game: Game;
	startGame: (mines: number) => void;
	handleMove: (data: GameMove, board: Board) => void;
}

export const useGameStore = create<GameState>()((set) => ({
	game: newGame(0),
	startGame: (mines) => set({ game: newGame(mines) }),
	handleMove: (move, board) =>
		set((state) => {
			return produce(state, (draft) => {
				gameMove(move, draft.game, board);
			});
		}),
}));
