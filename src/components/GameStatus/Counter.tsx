import { useState, useEffect, useRef, useCallback } from "react";

import { Timer } from "~/icons";
import { Status } from "~/minesweeper/types";
import { useGameStore } from "~/state";

const Counter = () => {
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(0);
	const { game, setDuration, setStartedAt } = useGameStore();

	const intervalRef = useRef<NodeJS.Timer>();
	const elapsed = end - start;

	const stopTimer = useCallback(() => {
		clearInterval(intervalRef.current);
	}, []);

	useEffect(() => {
		return () => stopTimer();
	}, []);

	useEffect(() => {
		stopTimer();
		if (game.status === Status.Win || game.status === Status.Lose) {
			setEnd(window.performance.now());
		}
		if (game.status === Status.Ready) {
			setStart(0);
			setEnd(0);
		}
		if (game.status === Status.Started) {
			setStartedAt(Date.now());
			setStart(window.performance.now());
			setEnd(window.performance.now());
			intervalRef.current = setInterval(() => {
				setEnd(window.performance.now());
			}, 100);
		}
	}, [game.status, stopTimer]);

	useEffect(() => {
		if (game.status === Status.Win || game.status === Status.Lose) {
			setDuration(elapsed);
		}
	}, [elapsed, game.status]);

	return (
		<p>
			<Timer className="w-6 h-6 inline-block mr-1 mb-1" />
			{Math.round(elapsed / 1000)}.{Math.round((elapsed % 1000) / 100)}
		</p>
	);
};

export default Counter;
