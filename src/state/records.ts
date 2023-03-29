import { create } from "zustand";
import { getRecords, saveRecord } from "~/api";
import { GameLevel, Record, RecordsMap } from "~/types";

interface RecordsState {
	recordsMap: RecordsMap;
	loadRecords: () => void;
	saveRecord: (
		record: Exclude<Record, "id">,
		gameLevel: Exclude<GameLevel, GameLevel.Custom>,
	) => void;
}

export const useRecordsStore = create<RecordsState>()((set) => ({
	recordsMap: {
		[GameLevel.Easy]: [],
		[GameLevel.Medium]: [],
		[GameLevel.Expert]: [],
	},
	loadRecords: async () => {
		const recordsMap = await getRecords();
		set({ recordsMap });
	},
	saveRecord: async (record, gameLevel) => {
		const recordsMap = await saveRecord(record, gameLevel);
		set({ recordsMap });
	},
}));
