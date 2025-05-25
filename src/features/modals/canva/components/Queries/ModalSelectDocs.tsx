import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useCanvasStore } from "@/state/canvaStore";
import { useState, type RefObject } from "react";

type ModalProps = {
	nextModalRef: RefObject<HTMLDialogElement | null>;
	newQuery: string;
	setNewQuery: (query: string) => void;
};

export const ModalSelectDocs = ({
	nextModalRef,
	newQuery,
	setNewQuery,
}: ModalProps) => {
	const words = newQuery.trim().split(/\s+/);
	const [selectedWords, setSelectedWords] = useState<string[]>([]);
	const [error, setError] = useState(false);

	const { addQuery } = useCanvasStore();

	const toggleWord = (word: string) => {
		setSelectedWords((prev) =>
			prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word],
		);
		setError(false);
	};

	const handleClose = () => {
		if (nextModalRef.current) {
			nextModalRef.current.close();
		}
	};

	const handleSubmit = () => {
		if (selectedWords.length === 0) {
			setError(true);
			return;
		}

		addQuery({
			full_query: newQuery,
			collections: selectedWords,
		});
		setNewQuery("");
		setSelectedWords([]);
		setError(false);
		handleClose();
	};

	return (
		<Modal title="Nueva Consulta" modalRef={nextModalRef} onClose={() => {}}>
			<>
				<div className="my-13 gap-5 w-160 flex justify-between items-start flex-col">
					<p className="text-h3 text-secondary-white mb-2">
						Escoge tus colecciones
					</p>
					<div className="flex flex-wrap gap-3">
						{words.map((word) => (
							<button
								key={`word-${word}`}
								type="button"
								onClick={() => toggleWord(word)}
								className={`cursor-pointer px-4 py-2 rounded-lg border border-gray transition-colors duration-200
								${
									selectedWords.includes(word)
										? "bg-gray text-white"
										: "bg-transparent text-secondary-white"
								}`}
							>
								{word}
							</button>
						))}
					</div>

					{error && (
						<p className="text-red-500 mt-4 text-sm">
							Debes seleccionar al menos una palabra.
						</p>
					)}
				</div>

				<div className="flex justify-end gap-5">
					<Button
						variant={"outline"}
						type="button"
						onClick={handleClose}
						className="cursor-pointer text-h3 text-white bg-red border-none hover:bg-red-dark hover:text-white"
					>
						Cancelar
					</Button>
					<Button
						variant={"outline"}
						type="button"
						onClick={handleSubmit}
						className="cursor-pointer text-h3 text-white bg-green border-none hover:bg-green-dark hover:text-white"
					>
						Siguiente
					</Button>
				</div>
			</>
		</Modal>
	);
};
