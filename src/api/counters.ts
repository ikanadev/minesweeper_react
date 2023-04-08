import { CountsMap, CountType } from "~/types";

const root = `${import.meta.env.VITE_API_ROOT}/counters`;

export async function getCounts(): Promise<CountsMap> {
	const resp = await fetch(`${root}/minesweeper`);
	return await resp.json();
}

export async function saveCount(countType: CountType): Promise<CountsMap> {
	const resp = await fetch(`${root}/minesweeper`, {
		method: "POST",
		body: JSON.stringify({ entity: countType }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await resp.json();
}
