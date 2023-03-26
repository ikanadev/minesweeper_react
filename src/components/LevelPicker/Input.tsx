import { FC, ChangeEvent } from "react";

type Props = {
	label: string;
	value: string;
	setterFn: (val: string) => void;
};
const Input: FC<Props> = ({ label, value, setterFn }) => {
	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		setterFn(ev.currentTarget.value);
	};
	return (
		<label className="font-medium">
			{label}:
			<input
				value={value}
				onChange={handleChange}
				type="number"
				className="ml-2 text-lg w-20 px-2 bg-white dark:bg-black dark:border dark:border-neutral-600 rounded-md"
			/>
		</label>
	);
};

export default Input;
