import { useEffect } from "react";
import { Status } from "~/minesweeper/types";
import {
	useBoardStore,
	useGameStore,
	useRecordsStore,
	useI18nStore,
} from "~/state";
import { GameLevel } from "~/types";
import RecordItem from "./RecordItem";

const Record = () => {
	const { board } = useBoardStore();
	const { game, startedAt, duration } = useGameStore();
	const { recordsMap, loadRecords } = useRecordsStore();
	const { i18n } = useI18nStore();

	const levelMap = {
		[GameLevel.Easy]: i18n.level.easy,
		[GameLevel.Medium]: i18n.level.medium,
		[GameLevel.Expert]: i18n.level.expert,
	};

	useEffect(() => {
		if (game.status === Status.Win) {
			console.log(game, board, startedAt, duration);
		}
	}, [game, board]);

	useEffect(() => {
		loadRecords();
	}, []);

	return (
		<section className="pb-4 text-neutral-800 dark:text-neutral-100">
			<div className="container px-2 py-3 mx-auto">
				<h2 className="text-2xl font-heading mb-2">{i18n.bestRecords}</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-8 gap-y-4">
					{(
						Object.keys(recordsMap) as Exclude<GameLevel, GameLevel.Custom>[]
					).map((key) => (
						<div key={key} className="flex flex-col gap-2">
							<h3 className="font-semibold">{levelMap[key]}</h3>
							{recordsMap[key].map((record, idx) => (
								<RecordItem key={record.id} record={record} place={idx + 1} />
							))}
							{recordsMap[key].length === 0 && (
								<p className="text-neutral-500 dark:text-neutral-400 italic text-sm">
									{i18n.noRecords}
								</p>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Record;
