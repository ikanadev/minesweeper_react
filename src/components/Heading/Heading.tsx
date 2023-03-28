import { Theme, useTheme } from "~/hooks";
import { Moon, Sun, Mine } from "~/icons";

const Heading = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<header className="bg-neutral-100 dark:bg-neutral-900">
			<div className="container px-2 py-3 mx-auto flex items-center">
				<span className="mb-2 mr-2">
					<Mine width="28px" height="28px" />
				</span>
				<h1 className="font-heading text-3xl text-neutral-900 dark:text-neutral-50">
					Minesweeper
				</h1>
				<div className="flex-1" />
				<button
					type="button"
					onClick={toggleTheme}
					className={`${
						theme === Theme.Dark ? "text-sky-500" : "text-amber-500"
					}`}
				>
					{theme === Theme.Dark ? (
						<Moon width="24px" height="24px" />
					) : (
						<Sun width="24px" height="24px" />
					)}
				</button>
			</div>
		</header>
	);
};

export default Heading;
