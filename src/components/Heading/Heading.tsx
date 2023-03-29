import { Listbox } from "@headlessui/react";

import { useI18nStore, i18nActions } from "~/state";
import { Theme, useTheme } from "~/hooks";
import { Moon, Sun, Mine, ChevronDown } from "~/icons";
import { Language } from "~/translations";

const langsMap = {
	[Language.Spanish]: "ES 🇲🇽",
	[Language.English]: "EN 🇺🇸",
};

const Heading = () => {
	const { theme, toggleTheme } = useTheme();
	const lang = useI18nStore((s) => s.lang);

	return (
		<header>
			<div className="max-w-lg px-2 py-3 mx-auto flex items-center text-neutral-800 dark:text-neutral-100">
				<span className="mb-2 mr-2">
					<Mine width="28px" height="28px" />
				</span>
				<h1 className="font-heading text-3xl text-neutral-900 dark:text-neutral-50">
					Minesweeper
				</h1>
				<div className="flex-1" />

				<div className="relative mr-4">
					<Listbox value={lang} onChange={i18nActions.setLanguage}>
						<Listbox.Button className="flex items-center border border-neutral-300 dark:border-neutral-600 rounded pl-2 py-0.5">
							<span className="text-base font-semibold">{langsMap[lang]}</span>
							<ChevronDown className="w-5 h-5 ml-1" />
						</Listbox.Button>
						<Listbox.Options className="absolute bg-white dark:bg-black rounded shadow w-full flex flex-col gap-1 px-1 py-1 mt-1">
							{[Language.Spanish, Language.English].map((lang) => (
								<Listbox.Option
									value={lang}
									key={lang}
									className="cursor-pointer rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 px-1"
								>
									{({ selected }) => (
										<div className={`${selected ? "font-semibold" : ""}`}>
											{langsMap[lang]}
										</div>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Listbox>
				</div>

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
