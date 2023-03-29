import { Record, RecordsMap, GameLevel } from "~/types";

const root = `${import.meta.env.VITE_API_ROOT}/minesweeper`;

export async function getRecords(): Promise<RecordsMap> {
	const resp = await fetch(`${root}/records`);
	return await resp.json();
}

export async function saveRecord(
	record: Omit<Record, "id">,
	gameLevel: Exclude<GameLevel, GameLevel.Custom>,
): Promise<RecordsMap> {
	const resp = await fetch(`${root}/records`, {
		method: "POST",
		body: JSON.stringify({ record, gameLevel }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await resp.json();
}
