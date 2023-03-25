import { Theme, useTheme } from "~/hooks";
import { BiMoonStarsFill, MdiWhiteBalanceSunny, Mine } from "~/icons";

const Heading = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<header className="bg-neutral-100 dark:bg-neutral-800">
			<div className="container px-6 py-4 mx-auto flex items-center">
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
						<BiMoonStarsFill width="24px" height="24px" />
					) : (
						<MdiWhiteBalanceSunny width="24px" height="24px" />
					)}
				</button>
			</div>
		</header>
	);
};

export default Heading;
