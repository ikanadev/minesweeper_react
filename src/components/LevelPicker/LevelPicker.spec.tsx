import {
	findByLabelText,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import { create } from "zustand";

import { englishLabels } from "~/translations";
import { BoardState, useBoardStore, useI18nStore } from "~/state";
import { EASY_MODE, MEDIUM_MODE, EXPERT_MODE } from "~/utils/contants";

import LevelPicker from "./LevelPicker";
import { BoardSettings } from "~/minesweeper/types";

let initialBoardStore: BoardState;
beforeAll(() => {
	initialBoardStore = useBoardStore.getState();
});
afterEach(() => {
	if (initialBoardStore) {
		useBoardStore.setState(initialBoardStore);
	}
});

describe("<Heading />", () => {
	describe("Initial render", () => {
		it("should start with easy mode board", () => {
			render(<LevelPicker />);
			const boardState = useBoardStore.getState();
			expect(boardState.board).toHaveLength(EASY_MODE.rows);
			expect(boardState.board?.[0]).toHaveLength(EASY_MODE.cols);
		});

		it("should render label", () => {
			render(<LevelPicker />);
			const { i18n } = useI18nStore.getState();
			expect(screen.getByLabelText(i18n.levelLabel)).toHaveTextContent(
				englishLabels.levelLabel,
			);
		});

		it("render radios with easy checked", () => {
			render(<LevelPicker />);
			const { i18n } = useI18nStore.getState();
			expect(screen.getByText(i18n.level.easy)).toBeInTheDocument();
			expect(screen.getByText(i18n.level.medium)).toBeInTheDocument();
			expect(screen.getByText(i18n.level.expert)).toBeInTheDocument();
			expect(screen.getByText(i18n.level.custom)).toBeInTheDocument();
			// Radio inputs
			const radioInputs = screen.getAllByRole("radio");
			expect(radioInputs).toHaveLength(4);
			expect(radioInputs[0]).toBeChecked();
			expect(radioInputs[1]).not.toBeChecked();
			expect(radioInputs[2]).not.toBeChecked();
			expect(radioInputs[3]).not.toBeChecked();
		});
	});

	describe("change game level", () => {
		it("pick medium", () => {
			render(<LevelPicker />);
			const { i18n } = useI18nStore.getState();
			const mediumOpt = screen.getByText(i18n.level.medium);
			fireEvent.click(mediumOpt);
			const board = useBoardStore.getState().board;
			expect(board).toHaveLength(MEDIUM_MODE.rows);
			expect(board[0]).toHaveLength(MEDIUM_MODE.cols);
		});

		it("pick expert and then easy", () => {
			render(<LevelPicker />);
			const { i18n } = useI18nStore.getState();
			const expertOpt = screen.getByText(i18n.level.expert);
			const easyOpt = screen.getByText(i18n.level.easy);
			fireEvent.click(expertOpt);
			let board = useBoardStore.getState().board;
			expect(board).toHaveLength(EXPERT_MODE.rows);
			expect(board[0]).toHaveLength(EXPERT_MODE.cols);

			fireEvent.click(easyOpt);
			board = useBoardStore.getState().board;
			expect(board).toHaveLength(EASY_MODE.rows);
			expect(board[0]).toHaveLength(EASY_MODE.cols);
		});
	});

	describe("custom level", () => {
		it("show form", async () => {
			render(<LevelPicker />);
			const { i18n } = useI18nStore.getState();
			const customOpt = screen.getByText(i18n.level.custom);
			fireEvent.click(customOpt);
			expect(
				await screen.findByLabelText(i18n.customLevel.rows),
			).toBeInTheDocument();
			expect(
				await screen.findByLabelText(i18n.customLevel.cols),
			).toBeInTheDocument();
			expect(
				await screen.findByLabelText(i18n.customLevel.mines),
			).toBeInTheDocument();
			expect(
				await screen.findByRole("button", { name: i18n.customLevelPlay }),
			).toBeInTheDocument();
		});

		it("generate custom board", async () => {
			render(<LevelPicker />);
			const boardOpts: BoardSettings = {
				rows: 75,
				cols: 80,
				mines: 550,
			};

			const { i18n } = useI18nStore.getState();
			const customOpt = screen.getByText(i18n.level.custom);
			fireEvent.click(customOpt);

			fireEvent.change(await screen.findByLabelText(i18n.customLevel.rows), {
				target: { value: boardOpts.rows },
			});
			fireEvent.change(await screen.findByLabelText(i18n.customLevel.cols), {
				target: { value: boardOpts.cols },
			});
			fireEvent.change(await screen.findByLabelText(i18n.customLevel.mines), {
				target: { value: boardOpts.mines },
			});
			fireEvent.click(
				await screen.findByRole("button", { name: i18n.customLevelPlay }),
			);

			let board = useBoardStore.getState().board;
			expect(board).toHaveLength(boardOpts.rows);
			expect(board[0]).toHaveLength(boardOpts.cols);
		});
	});
});
