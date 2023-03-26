import { useEffect, useState, useMemo } from "react";
import { RadioGroup } from "@headlessui/react";

import { BoardSettings } from "~/minesweeper/types";
import { useBoardStore, useI18nStore } from "~/state";
import {
	EASY_MODE,
	MEDIUM_MODE,
	EXPERT_MODE,
	BOARD_MAX_SIZE,
	BOARD_MIN_SIZE,
} from "~/utils/contants";
import Input from "./Input";

export enum GameLevel {
	Easy,
	Medium,
	Expert,
	Custom,
}

const LevelPicker = () => {
	const [rows, setRows] = useState("5");
	const [cols, setCols] = useState("5");
	const [mines, setMines] = useState("10");
	const [errMsg, setErrMsg] = useState("");
	const [gameLevel, setGameLevel] = useState(GameLevel.Easy);

	const { i18n } = useI18nStore();
	const { newBoard } = useBoardStore();

	const gameLevelOpts = useMemo(
		() => [
			{ value: GameLevel.Easy, label: i18n.level.easy },
			{ value: GameLevel.Medium, label: i18n.level.medium },
			{ value: GameLevel.Expert, label: i18n.level.expert },
			{ value: GameLevel.Custom, label: i18n.level.custom },
		],
		[i18n],
	);

	useEffect(() => {
		if (gameLevel !== GameLevel.Custom) {
			newBoard(getBoardSettings(gameLevel));
		}
	}, [gameLevel]);

	// clear error message when editing
	useEffect(() => {
		if (errMsg) {
			setErrMsg("");
		}
	}, [rows, cols, mines]);

	const handlePlayCustomGame = () => {
		const rowsNum = parseInt(rows, 10);
		const colsNum = parseInt(cols, 10);
		const minesNum = parseInt(mines, 10);
		if (isNaN(rowsNum) || isNaN(colsNum) || isNaN(minesNum)) {
			setErrMsg(i18n.customLevelErrors.notNumber);
			return;
		}
		if (!isBoardSizeValid(rowsNum, colsNum)) {
			setErrMsg(i18n.customLevelErrors.invalidRowColRange);
			return;
		}
		const boardCells = rowsNum * colsNum;
		const minMines = Math.round(boardCells / 10);
		const maxMines = boardCells - 1;
		if (minesNum < minMines || minesNum > maxMines) {
			setErrMsg(i18n.customLevelErrors.invalidMinesRange(maxMines, minMines));
			return;
		}
		newBoard({
			rows: parseInt(rows),
			cols: parseInt(cols),
			mines: parseInt(mines),
		});
	};

	return (
		<div className="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
			<div className="container px-6 mx-auto pb-6">
				<div>
					<RadioGroup value={gameLevel} onChange={setGameLevel}>
						<RadioGroup.Label className="text-lg font-semibold">
							{i18n.levelLabel}
						</RadioGroup.Label>
						<div className="flex gap-1 mt-1">
							{gameLevelOpts.map((opt) => (
								<RadioGroup.Option
									value={opt.value}
									key={opt.value}
									className="focus:outline-none p-[3px] bg-transparent focus:bg-neutral-400 rounded-md"
								>
									{({ checked }) => (
										<span
											className={`px-3 py-1.5 font-semibold rounded-md inline-block ${
												checked
													? "bg-neutral-800 dark:bg-neutral-100 text-white dark:text-black shadow-md "
													: "bg-neutral-200 dark:bg-neutral-800 cursor-pointer"
											}`}
										>
											{opt.label}
										</span>
									)}
								</RadioGroup.Option>
							))}
						</div>
					</RadioGroup>
				</div>
				{gameLevel === GameLevel.Custom && (
					<>
						<div className="mt-4 flex gap-4 text-neutral-900 dark:text-neutral-100">
							<Input
								label={i18n.customLevel.rows}
								value={rows}
								setterFn={setRows}
							/>
							<Input
								label={i18n.customLevel.cols}
								value={cols}
								setterFn={setCols}
							/>
							<Input
								label={i18n.customLevel.mines}
								value={mines}
								setterFn={setMines}
							/>
							<button
								type="button"
								name={i18n.customLevelPlay}
								onClick={handlePlayCustomGame}
								className="px-3 py-1.5 font-semibold rounded-md bg-neutral-800 dark:bg-neutral-100 text-white dark:text-black shadow-md"
							>
								{i18n.customLevelPlay}
							</button>
						</div>
						{errMsg.length > 0 && (
							<p className="text-sm text-red-600 italic">{errMsg}</p>
						)}
					</>
				)}
			</div>
		</div>
	);
};

function getBoardSettings(level: GameLevel): BoardSettings {
	if (level === GameLevel.Easy) return EASY_MODE;
	if (level === GameLevel.Medium) return MEDIUM_MODE;
	return EXPERT_MODE;
}
function isBoardSizeValid(rows: number, cols: number): boolean {
	if (rows < BOARD_MIN_SIZE || cols < BOARD_MIN_SIZE) {
		return false;
	}
	if (rows > BOARD_MAX_SIZE || cols > BOARD_MAX_SIZE) {
		return false;
	}
	return true;
}

export default LevelPicker;
