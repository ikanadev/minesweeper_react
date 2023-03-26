import React, { useEffect, useState } from "react";
import { useBoardStore, useGameStore } from "~/state";
import { Heading, LevelPicker } from "~/components";
import {
	BoardCell,
	Cell,
	CellMapIndex,
	Click,
	Status,
} from "./minesweeper/types";

function App() {
	const { board } = useBoardStore((state) => state);
	const { game, handleMove } = useGameStore((state) => state);

	const getCellLabel = (cell: BoardCell) => {
		if (cell === Cell.Blank) return " ";
		if (cell === Cell.Mine) return "*";
		return cell;
	};

	const getStatusLabel = (status: Status) => {
		if (status === Status.Lose) return "You lose";
		if (status === Status.Win) return "You WON!";
		return "Playing";
	};

	const handleOpenCell = (row: number, col: number) => {
		handleMove({ row, col, click: Click.Left }, board);
	};

	const handleFlagCell = (
		ev: React.MouseEvent<HTMLSpanElement, MouseEvent>,
	) => {
		ev.preventDefault();
		const el = ev.currentTarget;
		let { row, col } = el.dataset;
		if (row === undefined || col === undefined) return;
		handleMove(
			{ row: parseInt(row), col: parseInt(col), click: Click.Right },
			board,
		);
	};

	return (
		<>
			<Heading />
			<LevelPicker />
			<div className="container mx-auto px-4">
				<h1 className="text-xl font-bold underline mb-8">
					Minesweeper: {getStatusLabel(game.status)}
				</h1>
				<div className="font-mono overflow-auto">
					{board.map((row, rowIdx) => (
						// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={rowIdx} className="h-6">
							{row.map((cell, colIdx) => {
								const cellMapIdx: CellMapIndex = `${rowIdx}-${colIdx}`;
								if (!game.openedMap[cellMapIdx]) {
									return (
										// rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
										<span
											// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={colIdx}
											data-row={rowIdx}
											data-col={colIdx}
											className="
											w-6 h-6 bg-gray-300 inline-block border
											border-gray-500 align-top
										"
											onClick={() => handleOpenCell(rowIdx, colIdx)}
											onContextMenu={handleFlagCell}
										>
											{game.flaggedMap[cellMapIdx] ? "F" : " "}
										</span>
									);
								}
								return (
									<span
										// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={colIdx}
										className="
										w-6 h-6 bg-white inline-block border border-gray-300
										text-center align-top
									"
									>
										{getCellLabel(cell)}
									</span>
								);
							})}
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default App;
