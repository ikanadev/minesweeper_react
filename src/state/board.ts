import { create } from "zustand";
import { newBoard } from "~/minesweeper";
import { Board, BoardSettings } from "~/minesweeper/types";
import { EASY_MODE } from "~/utils/contants";

export interface BoardState {
	board: Board;
}
interface BoardActions {
	newBoard: (settings: BoardSettings) => void;
}

export const useBoardStore = create<BoardState>(() => ({
	board: newBoard(EASY_MODE),
}));

export const boardActions: BoardActions = {
	newBoard: (settings) => {
		useBoardStore.setState({ board: newBoard(settings) });
	},
};
