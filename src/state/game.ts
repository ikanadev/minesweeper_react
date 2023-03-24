import { create } from "zustand";
import { produce } from "structurajs";
import { newGame, gameMove } from "~/minesweeper";
import { Board, Click, Game, GameMove } from "~/minesweeper/types";

interface GameState {
	game: Game;
	startGame: (mines: number) => void;
	handleMove: (
		data: { row: number; col: number; click: Click },
		board: Board,
	) => void;
}

export const useGameStore = create<GameState>()((set) => ({
	game: newGame(0),
	startGame: (mines) => set({ game: newGame(mines) }),
	handleMove: ({ row, col, click }, board) =>
		set((state) => {
			return produce(state, (draft) => {
				const move: GameMove = {
					row,
					col,
					click,
					game: draft.game,
				};
				gameMove(move, board);
			});
		}),
}));
