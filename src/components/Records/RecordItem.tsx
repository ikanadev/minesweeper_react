import { FC } from "react";
import dayjs from "dayjs";

import { milliToSecs } from "~/utils/functions";

import { Timer } from "~/icons";
import { Record } from "~/types";

type Props = {
	record: Record;
	place: number;
};
const RecordItem: FC<Props> = ({ record, place }) => {
	return (
		<div
			key={record.id}
			className="flex items-center bg-white dark:bg-black shadow-sm pl-2 pr-3 py-1.5 border-b border-neutral-200"
		>
			<p className="text-xl font-medium mr-4 font-mono whitespace-pre">
				{` ${place}`.slice(-2)}
			</p>
			<div className="flex-1">
				<p className="font-normal leading-6">{record.name}</p>
				<p className="text-xs italic font-normal text-gray-600 dark:text-gray-300">
					{dayjs(record.startedAt).format("lll")}
				</p>
			</div>
			<div className="text-lg font-medium">
				<Timer className="w-5 h-5 inline-block mb-1 mr-1" />
				{milliToSecs(record.duration, 3)}s
			</div>
		</div>
	);
};

export default RecordItem;
