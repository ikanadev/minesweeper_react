import { useEffect, useState, useCallback } from "react";
import { Status } from "~/minesweeper/types";
import {
	useBoardStore,
	useGameStore,
	useRecordsStore,
	useI18nStore,
	recordsActions,
} from "~/state";
import { GameLevel } from "~/types";
import { RECORDS_MAX_ITEMS } from "~/utils/contants";
import RecordItem from "./RecordItem";
import NewRecordModal from "./NewRecordModal";

const Record = () => {
	const [showModal, setShowModal] = useState(false);
	const board = useBoardStore((s) => s.board);
	const { game, duration, gameLevel } = useGameStore();
	const recordsMap = useRecordsStore((s) => s.recordsMap);
	const i18n = useI18nStore((s) => s.i18n);

	const toggleModal = () => setShowModal((prev) => !prev);

	const levelMap = {
		[GameLevel.Easy]: i18n.level.easy,
		[GameLevel.Medium]: i18n.level.medium,
		[GameLevel.Expert]: i18n.level.expert,
	};

	const isNewRecord = useCallback(() => {
		// duration 0 means the durations is not calculated yet
		if (duration === 0) return false;
		if (gameLevel === GameLevel.Custom) return false;
		const records = recordsMap[gameLevel];
		if (recordsMap[gameLevel].length < RECORDS_MAX_ITEMS) {
			return true;
		}
		return records.some((record) => {
			return duration < record.duration;
		});
	}, [gameLevel, duration]);

	useEffect(() => {
		if (game.status === Status.Win) {
			setShowModal(isNewRecord());
		}
	}, [game, isNewRecord]);

	useEffect(() => {
		recordsActions.loadRecords();
	}, []);

	return (
		<section className="pb-4 text-neutral-800 dark:text-neutral-100">
			<NewRecordModal open={showModal} onClose={toggleModal} />
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
