import ClosedCell from "./ClosedCell";
import OpenedCell from "./OpenedCell";

import { Click } from "~/minesweeper/types";
import { useBoardStore, useGameStore } from "~/state";

const Board = () => {
	const { board } = useBoardStore((state) => state);
	const { game, handleMove } = useGameStore((state) => state);

	const handleOpenCell = (
		ev: React.MouseEvent<HTMLSpanElement, MouseEvent>,
	) => {
		const el = ev.currentTarget;
		let { row, col } = el.dataset;
		if (row === undefined || col === undefined) return;
		handleMove(
			{ row: parseInt(row, 10), col: parseInt(col, 10), click: Click.Left },
			board,
		);
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
		<main className="bg-neutral-100 dark:bg-neutral-900">
			<div className="container px-2 mx-auto">
				<div className="w-full overflow-auto flex flex-col gap-0.5">
					{board.map((row, i) => (
						// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={i} className="flex gap-0.5">
							{row.map((cell, j) => (
								// rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
								<div
									// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={j}
									onClick={handleOpenCell}
									onContextMenu={handleFlagCell}
									data-row={i}
									data-col={j}
								>
									{game.openedMap[`${i}-${j}`] ? (
										<OpenedCell cell={cell} />
									) : (
										<ClosedCell flagged={game.flaggedMap[`${i}-${j}`]} />
									)}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default Board;
