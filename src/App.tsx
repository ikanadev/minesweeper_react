import {
	Heading,
	LevelPicker,
	Board,
	GameStatus,
	Records,
	Counters,
} from "~/components";

function App() {
	return (
		<>
			<Heading />
			<Counters />
			<LevelPicker />
			<GameStatus />
			<Board />
			<Records />
		</>
	);
}

export default App;
