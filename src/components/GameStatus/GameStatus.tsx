import { Flag, Mine } from "~/icons";
import Counter from "./Counter";
import { useGameStore, useI18nStore, gameActions } from "~/state";
import { Status } from "~/minesweeper/types";
import { Button } from "~/components";

const GameStatus = () => {
	const game = useGameStore((s) => s.game);
	const i18n = useI18nStore((s) => s.i18n);

	const gameStatusMap = {
		[Status.Ready]: i18n.gameStatus.ready,
		[Status.Started]: i18n.gameStatus.started,
		[Status.Win]: i18n.gameStatus.win,
		[Status.Lose]: i18n.gameStatus.lose,
	};

	const restartGame = () => {
		gameActions.resetGame();
	};

	return (
		<main className="pb-1">
			<div className="max-w-lg px-2 mx-auto text-neutral-800 dark:text-neutral-100 flex flex-col items-center">
				<h2 className="text-center font-heading text-2xl">
					{gameStatusMap[game.status]}
				</h2>
				<div className="h-7 font-medium">
					{game.status !== Status.Ready && (
						<Button small onClick={restartGame}>
							{i18n.restartGame}
						</Button>
					)}
				</div>

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
				</div>
			</div>
		</main>
	);
};

export default GameStatus;
