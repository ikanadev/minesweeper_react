import { useEffect } from "react";
import { Status } from "~/minesweeper/types";
import { useCounterStore, counterActions, useGameStore } from "~/state";

const Counter = () => {
	const counts = useCounterStore();
	const gameStatus = useGameStore((s) => s.game.status);

	useEffect(() => {
		if (gameStatus === Status.Win) {
			counterActions.saveCount("solved_boards");
			counterActions.saveCount("total_attempts");
		}
		if (gameStatus === Status.Lose) {
			counterActions.saveCount("total_attempts");
		}
	}, [gameStatus]);

	useEffect(() => {
		counterActions.getCounts();
	}, []);
	return (
		<section>
			<div className="max-w-lg px-2 mx-auto flex justify-end text-neutral-800 dark:text-neutral-100">
				<div className="text-sm">
					<p>
						Total attempts: <span>{counts.total}</span>
					</p>
					<p>
						Solved boards: <span>{counts.solved}</span>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Counter;
