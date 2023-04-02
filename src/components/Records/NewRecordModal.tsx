import { FC, Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";

import {
	recordsActions,
	useBoardStore,
	useGameStore,
	useI18nStore,
} from "~/state";
import { GameLevel } from "~/types";

type Props = {
	open: boolean;
	onClose: () => void;
};

const MAX_NAME_CHARS = 20;

const NewRecordModal: FC<Props> = ({ open, onClose }) => {
	const [name, setName] = useState("");

	const board = useBoardStore((s) => s.board);
	const i18n = useI18nStore((s) => s.i18n);
	const { game, gameLevel, duration, startedAt } = useGameStore();

	const handleSaveRecord = () => {
		if (name.trim().length === 0) return;
		if (gameLevel === GameLevel.Custom) return;
		recordsActions.saveRecord(
			{ board, game, duration, name, startedAt },
			gameLevel,
		);
		setName("");
		onClose();
	};

	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-60" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-start justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel
								className="
                w-full max-w-md overflow-hidden rounded-md bg-neutral-100
								dark:bg-neutral-900
                p-6 text-left shadow-lg shadow-neutral-400 dark:shadow-neutral-700
                text-neutral-800 dark:text-neutral-100 mt-12
              "
							>
								<Dialog.Title
									as="h3"
									className="text-2xl font-medium leading-6 font-heading"
								>
									{i18n.recordModal.title}
								</Dialog.Title>
								<div className="mt-2">
									<p className="mb-2">{i18n.recordModal.description}</p>
									<input
										value={name}
										onChange={(e) =>
											setName(
												e.currentTarget.value.substring(0, MAX_NAME_CHARS + 1),
											)
										}
										className="text-lg bg-white dark:bg-black rounded-md px-2 py-1 focus:outline-none"
										placeholder={` ${i18n.recordModal.placeholder}`}
										maxLength={MAX_NAME_CHARS}
									/>
									<p className="text-xs text-neutral-500 ml-1">
										{name.length}/{MAX_NAME_CHARS}
									</p>
								</div>

								<div className="mt-4 flex justify-end gap-4 font-semibold">
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
									>
										{i18n.recordModal.saveButton}
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default NewRecordModal;
