import { FC } from "react";
import { Flag } from "~/icons";

type Props = {
	flagged: boolean;
};
const ClosedCell: FC<Props> = ({ flagged }) => {
	return (
		<div className="w-10 h-10 bg-neutral-400 dark:bg-neutral-800 rounded-sm p-1">
			{flagged && <Flag className="w-8 h-8" />}
		</div>
	);
};

export default ClosedCell;
