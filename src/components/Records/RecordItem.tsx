import { FC } from "react";
import dayjs from "dayjs";

import { milliToSecs } from "~/utils/functions";

import { Timer, Grid } from "~/icons";
import { Record } from "~/types";

type Props = {
	record: Record;
	place: number;
};
const RecordItem: FC<Props> = ({ record, place }) => {
	return (
		<div
			key={record.id}
			className="
				flex items-center bg-white dark:bg-black shadow-sm pl-1
				pr-2 py-1.5 border-b border-neutral-200 dark:border-neutral-600
			"
		>
			<p className="text-xl font-medium mr-2 font-mono whitespace-pre">
				{` ${place}`.slice(-2)}
			</p>
			<div className="flex-1">
				<p className="font-normal text-sm leading-6">{record.name}</p>
				<p className="text-xs italic font-normal text-gray-600 dark:text-gray-300">
					{dayjs(record.startedAt).format("lll")}
				</p>
			</div>
			<div className="text-base font-medium">
				<Timer className="w-5 h-5 inline-block mb-1 mr-0.5" />
				{milliToSecs(record.duration, 3)}s
			</div>
			<button
				type="button"
				className="
					ml-2 border border-neutral-300 rounded shadow-sm text-neutral-500
					cursor-pointer dark:text-neutral-300 dark:border-neutral-500
				"
			>
				<Grid className="w-6 h-6" />
			</button>
		</div>
	);
};

export default RecordItem;
