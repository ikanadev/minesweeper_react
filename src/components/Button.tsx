import { ButtonHTMLAttributes, FC } from "react";
/*
<button
  type="button"
  className="
    rounded-md bg-neutral-200 px-3 py-1.5 text-sm focus:outline-none
    focus-visible:ring-2 focus-visible:ring-neutral-500
    dark:bg-neutral-800
  "
  onClick={onClose}
>
  {i18n.recordModal.cancelButton}
</button>
<button
  type="button"
  className="
    rounded-md bg-neutral-800 text-white shadow-sm px-3 py-1.5
    focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400
    disabled:opacity-50 disabled:dark:opacity-30 dark:bg-neutral-100 dark:text-black
  "
  disabled={name.trim().length === 0}
  onClick={handleSaveRecord}
></button> */

type Props = {
	primary?: boolean;
	small?: boolean;
};
const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = ({
	primary = false,
	small = false,
	...rest
}) => (
	<button
		{...rest}
		className={`rounded-md focus:outline-none focus-visible:ring-2 font-medium disabled:opacity-50 dark:disabled:opacity-30 disabled:cursor-not-allowed ${
			primary
				? "bg-neutral-800 dark:bg-neutral-100 text-white dark:text-black focus-visible:ring-neutral-400"
				: "bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 focus-visible:ring-neutral-500"
		} ${
			small
				? "text-sm font-medium px-2 py-1"
				: "text-base font-semibold px-3 py-1.5"
		}`}
	/>
);

export default Button;
