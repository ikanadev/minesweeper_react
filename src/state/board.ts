import { create } from "zustand";
import { newBoard } from "~/minesweeper";
import { Board, BoardSettings } from "~/minesweeper/types";
import { EASY_MODE } from "~/utils/contants";

interface BoardState {
	board: Board;
	newBoard: (settings: BoardSettings) => void;
}

export const useBoardStore = create<BoardState>()((set) => ({
	board: newBoard(EASY_MODE),
	newBoard: (settings) => set({ board: newBoard(settings) }),
}));
