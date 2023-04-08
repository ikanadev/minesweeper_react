import ClosedCell from "./ClosedCell";
import OpenedCell from "./OpenedCell";

import { Click } from "~/minesweeper/types";
import { useBoardStore, useGameStore, gameActions } from "~/state";

const Board = () => {
	const board = useBoardStore((s) => s.board);
	const game = useGameStore((s) => s.game);

	const handleOpenCell = (
		ev: React.MouseEvent<HTMLSpanElement, MouseEvent>,
	) => {
		const el = ev.currentTarget;
		const { row, col } = el.dataset;
		if (row === undefined || col === undefined) return;
		gameActions.handleMove(
			{ row: parseInt(row, 10), col: parseInt(col, 10), click: Click.Left },
			board,
		);
	};

	const handleFlagCell = (
		ev: React.MouseEvent<HTMLSpanElement, MouseEvent>,
	) => {
		ev.preventDefault();
		const el = ev.currentTarget;
		const { row, col } = el.dataset;
		if (row === undefined || col === undefined) return;
		gameActions.handleMove(
			{ row: parseInt(row), col: parseInt(col), click: Click.Right },
			board,
		);
	};
	return (
		<main className="pb-4">
			<div className="overflow-x-scroll flex justify-center">
				<div
					className="flex flex-col gap-0.5"
					onContextMenu={(e) => e.preventDefault()}
				>
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
