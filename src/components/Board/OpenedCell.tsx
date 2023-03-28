import { FC, memo } from "react";
import { Mine } from "~/icons";
import { BoardCell, Cell } from "~/minesweeper/types";

const colorMap: { [key: number]: string } = {
	1: "text-green-600 dark:text-green-400",
	2: "text-green-700 dark:text-green-500",
	3: "text-orange-500 dark:text-orange-400",
	4: "text-orange-600 dark:text-orange-500",
	5: "text-red-500 dark:text-red-400",
	6: "text-red-600 dark:text-red-500",
	7: "text-violet-700 dark:text-violet-400",
	8: "text-violet-800 dark:text-violet-500",
};

type Props = {
	cell: BoardCell;
};
const OpenedCell: FC<Props> = memo(({ cell }) => {
	return (
		<div
			className={`w-8 h-8 rounded-sm p-1 text-xl font-semibold flex justify-center items-center overflow-hidden ${
				cell === Cell.Mine
					? "bg-red-200 dark:bg-neutral-800"
					: "bg-gray-200 dark:bg-neutral-800"
			} ${typeof cell === "number" && colorMap[cell]}`}
		>
			{cell === Cell.Mine && <Mine className="w-6 h-6" />}
			{typeof cell === "number" && cell}
		</div>
	);
});

export default OpenedCell;
