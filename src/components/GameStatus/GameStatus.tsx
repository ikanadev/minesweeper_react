import { Flag, Mine } from "~/icons";
import Counter from "./Counter";
import { useGameStore, useBoardStore, useI18nStore } from "~/state";
import { Status } from "~/minesweeper/types";

const GameStatus = () => {
	const { game } = useGameStore();
	const { board, newBoard } = useBoardStore();
	const { i18n } = useI18nStore();

	const gameStatusMap = {
		[Status.Ready]: i18n.gameStatus.ready,
		[Status.Started]: i18n.gameStatus.started,
		[Status.Win]: i18n.gameStatus.win,
		[Status.Lose]: i18n.gameStatus.lose,
	};

	const restartGame = () => {
		newBoard({
			rows: board.length,
			cols: board[0]?.length,
			mines: game.minesCount,
		});
	};

	return (
		<main className="pb-1">
			<div className="container px-2 mx-auto text-neutral-800 dark:text-neutral-100">
				<h2 className="text-center font-heading text-2xl">
					{gameStatusMap[game.status]}
				</h2>
				<div className="flex items-end text-lg font-semibold">
					<p>
						<Flag className="w-6 h-6 inline-block mr-1 mb-1" />
						{game.minesCount - Object.keys(game.flaggedMap).length}
					</p>
					<div className="w-6" />
					<p>
						<Mine className="w-6 h-6 inline-block mr-1 mb-1" />
						{game.minesCount}
					</p>
					<div className="w-6" />
					<Counter />
					<div className="w-8" />
					{game.status !== Status.Ready && (
						<button
							type="button"
							onClick={restartGame}
							className="mb-0.5 underline"
						>
							{i18n.restartGame}
						</button>
					)}
				</div>
			</div>
		</main>
	);
};

export default GameStatus;
