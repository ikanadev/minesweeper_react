import { create } from "zustand";
import { newBoard } from "~/minesweeper";
import { Board, BoardSettings } from "~/minesweeper/types";
import { EASY_MODE } from "~/utils/contants";
import { useGameStore } from "./game";

export interface BoardState {
	board: Board;
	newBoard: (settings: BoardSettings) => void;
}

export const useBoardStore = create<BoardState>()((set) => ({
	board: newBoard(EASY_MODE),
	newBoard: (settings) => {
		useGameStore.getState().startGame(settings.mines);
		set({ board: newBoard(settings) });
	},
}));
