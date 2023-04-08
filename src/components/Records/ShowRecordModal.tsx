import { FC, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Record } from "~/types";
import { Timer } from "~/icons";
import { Button } from "~/components";
import ClosedCell from "~/components/Board/ClosedCell";
import OpenedCell from "~/components/Board/OpenedCell";

import dayjs from "dayjs";
import { milliToSecs } from "~/utils/functions";
import { useI18nStore } from "~/state";

type Props = {
	onClose: () => void;
	record: Record | null;
};

const ShowRecordModal: FC<Props> = ({ record, onClose }) => {
	const i18n = useI18nStore((s) => s.i18n);
	return (
		<Transition appear show={!!record} as={Fragment}>
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
                max-w-full rounded bg-neutral-100
								dark:bg-neutral-900
                p-2 text-left shadow-md shadow-neutral-400 dark:shadow-neutral-700
                text-neutral-800 dark:text-neutral-100 mt-12
              "
							>
								{record && (
									<>
										<Dialog.Title
											as="div"
											className="text-xl font-medium leading-6 flex justify-between"
										>
											<h3>{record.name}</h3>
											<p>
												<Timer className="inline-block mr-1 w-6 h-6" />
												{milliToSecs(record.duration, 3)}s
											</p>
										</Dialog.Title>
										<p className="mb-2 italic text-right">
											{dayjs(record.startedAt).format("lll")}
										</p>
										<div className="mt-2 overflow-x-auto w-full flex justify-center">
											<div className="flex flex-col gap-0.5">
												{record.board.map((row, i) => (
													// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
													<div key={i} className="flex gap-0.5">
														{row.map((cell, j) => (
															// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
															<div key={j}>
																{record.game.openedMap[`${i}-${j}`] ? (
																	<OpenedCell cell={cell} />
																) : (
																	<ClosedCell
																		flagged={
																			record.game.flaggedMap[`${i}-${j}`]
																		}
																	/>
																)}
															</div>
														))}
													</div>
												))}
											</div>
										</div>
										<div className="mt-2 flex justify-end">
											<Button type="button" onClick={onClose} small>
												{i18n.close}
											</Button>
										</div>
									</>
								)}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default ShowRecordModal;
