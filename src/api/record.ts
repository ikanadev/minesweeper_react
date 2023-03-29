import { Record, RecordsMap, GameLevel } from "~/types";

const root = `${import.meta.env.VITE_API_ROOT}/minesweeper`;

const dummyRecords: RecordsMap = {
	[GameLevel.Easy]: [
		{
			id: "1",
			game: {
				openedMap: {},
				flaggedMap: {},
				status: 0,
				minesCount: 10,
			},
			board: [],
			startedAt: 1680039623959,
			duration: 27993,
			name: "Jhonny",
		},
	],
	[GameLevel.Medium]: [],
	[GameLevel.Expert]: [
		{
			id: "2",
			game: {
				openedMap: {},
				flaggedMap: {},
				status: 0,
				minesCount: 10,
			},
			board: [],
			startedAt: 1680029623959,
			duration: 122983,
			name: "Dan",
		},
		{
			id: "3",
			game: {
				openedMap: {},
				flaggedMap: {},
				status: 0,
				minesCount: 10,
			},
			board: [],
			startedAt: 1680038623959,
			duration: 262283,
			name: "Danna",
		},
	],
};

export async function getRecords(): Promise<RecordsMap> {
	return dummyRecords;
	/* const resp = await fetch(`${root}/records`);
	return await resp.json(); */
}

export async function saveRecord(
	record: Exclude<Record, "id">,
	gameLevel: Exclude<GameLevel, GameLevel.Custom>,
): Promise<RecordsMap> {
	return dummyRecords;
	/*
	const resp = await fetch(`${root}/records`, {
		method: "POST",
		body: JSON.stringify({ record, gameLevel }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await resp.json();
	*/
}
