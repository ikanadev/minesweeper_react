import { create } from "zustand";
import { CountType } from "~/types";
import { getCounts, saveCount } from "~/api";

interface CounterState {
	total: number;
	solved: number;
}

interface CounterActions {
	getCounts: () => void;
	saveCount: (type: CountType) => void;
}

export const useCounterStore = create<CounterState>(() => ({
	total: 0,
	solved: 0,
}));

export const counterActions: CounterActions = {
	getCounts: async () => {
		const resp = await getCounts();
		useCounterStore.setState({
			total: resp.total_attempts,
			solved: resp.solved_boards,
		});
	},
	saveCount: async (type) => {
		const resp = await saveCount(type);
		useCounterStore.setState({
			total: resp.total_attempts,
			solved: resp.solved_boards,
		});
	},
};
