import { FC } from "react";
import dayjs from "dayjs";

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
			className="flex items-center bg-white dark:bg-black shadow-sm px-3 py-1 rounded-md"
		>
			<p className="text-xl font-semibold mr-2">{place}</p>
			<div className="flex-1">
				<p className="font-medium leading-5">{record.name}</p>
				<p className="text-xs italic text-gray-600 dark:text-gray-300">
					{dayjs(record.startedAt).format("lll")}
				</p>
			</div>
			<div className="text-lg font-medium">
				<Timer className="w-5 h-5 inline-block mb-1 mr-1" />
				{Math.round(record.duration / 1000)}.{record.duration % 1000}s
			</div>
		</div>
	);
};

export default RecordItem;
