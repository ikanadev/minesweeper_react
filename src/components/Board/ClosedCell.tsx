import { FC, memo } from "react";
import { Flag } from "~/icons";

type Props = {
	flagged: boolean;
};
const ClosedCell: FC<Props> = memo(({ flagged }) => {
	return (
		<div className="w-8 h-8 bg-gray-400 dark:bg-slate-600 rounded-sm p-1">
			{flagged && <Flag className="w-6 h-6" />}
		</div>
	);
});

export default ClosedCell;
