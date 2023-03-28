import { Flag, Mine } from "~/icons";
import Counter from "./Counter";
import { useGameStore } from "~/state";

const GameStatus = () => {
	const { game } = useGameStore();
	return (
		<main className="bg-neutral-100 dark:bg-neutral-900 pb-1">
			<div className="container px-2 mx-auto text-neutral-800 dark:text-neutral-100">
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
