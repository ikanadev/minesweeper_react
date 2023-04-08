import { useEffect, useState, useCallback } from "react";
import { Status } from "~/minesweeper/types";

import {
	useGameStore,
	useRecordsStore,
	useI18nStore,
	recordsActions,
} from "~/state";
import { useBool } from "~/hooks";
import { GameLevel, Record } from "~/types";
import { RECORDS_MAX_ITEMS } from "~/utils/contants";
import RecordItem from "./RecordItem";
import NewRecordModal from "./NewRecordModal";
import ShowRecordModal from "./ShowRecordModal";

const Record = () => {
	const newRecordModal = useBool();
	const { game, duration, gameLevel } = useGameStore();
	const recordsMap = useRecordsStore((s) => s.recordsMap);
	const i18n = useI18nStore((s) => s.i18n);
	const [selectedRecord, setSelectedRecord] = useState<null | Record>(null);

	const clearSelectedRecord = () => setSelectedRecord(null);

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
			newRecordModal.setIsActive(isNewRecord());
		}
	}, [game, isNewRecord]);

	useEffect(() => {
		recordsActions.loadRecords();
	}, []);

	return (
		<section className="pb-4 text-neutral-800 dark:text-neutral-100">
			<NewRecordModal
				open={newRecordModal.isActive}
				onClose={newRecordModal.toggle}
			/>
			<ShowRecordModal record={selectedRecord} onClose={clearSelectedRecord} />
			<div className="container px-2 py-3 mx-auto">
				<h2 className="text-2xl font-heading mb-2 text-center">
					{i18n.bestRecords}
				</h2>
				<div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6">
					{(
						Object.keys(recordsMap) as Exclude<GameLevel, GameLevel.Custom>[]
					).map((key) => (
						<div
							key={key}
							className="flex flex-col text-neutral-700 dark:text-neutral-100"
						>
							<h3 className="font-semibold text-center mb-1">
								{levelMap[key]}
							</h3>
							{recordsMap[key].map((record, idx) => (
								<RecordItem
									key={record.id}
									record={record}
									place={idx + 1}
									selectRecord={setSelectedRecord}
								/>
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
