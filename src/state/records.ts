import { create } from "zustand";
import { getRecords, saveRecord } from "~/api";
import { GameLevel, Record, RecordsMap } from "~/types";

interface RecordsState {
	recordsMap: RecordsMap;
}

interface RecordsActions {
	loadRecords: () => void;
	saveRecord: (
		record: Omit<Record, "id">,
		gameLevel: Exclude<GameLevel, GameLevel.Custom>,
	) => void;
}

export const useRecordsStore = create<RecordsState>(() => ({
	recordsMap: {
		[GameLevel.Easy]: [],
		[GameLevel.Medium]: [],
		[GameLevel.Expert]: [],
	},
}));

export const recordsActions: RecordsActions = {
	loadRecords: async () => {
		const recordsMap = await getRecords();
		useRecordsStore.setState({ recordsMap });
	},
	saveRecord: async (record, gameLevel) => {
		const recordsMap = await saveRecord(record, gameLevel);
		useRecordsStore.setState({ recordsMap });
	},
};
