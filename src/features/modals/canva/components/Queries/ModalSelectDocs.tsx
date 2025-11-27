import { useState, type RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { ArrowLeft } from "lucide-react";
import { useCanvasStore } from "@/state/canvaStore";
import { useUniqueId } from "@/hooks/use-unique-id";
import clsx from "clsx"; // Asegúrate de tener esta dependencia instalada
import type { Query } from "../../types";

type ModalProps = {
	nextModalRef: RefObject<HTMLDialogElement | null>;
	modalRef: RefObject<HTMLDialogElement | null>;
	queryText: string;
	queryEdit?: Query;
	mode: "create" | "edit";
	setQueryText: (query: string) => void;
};

export const ModalSelectDocs = ({
	nextModalRef,
	modalRef,
	queryText,
	queryEdit,
	mode,
	setQueryText,
}: ModalProps) => {
	const words = queryText.trim().split(/\s+/);
	const [selectedWords, setSelectedWords] = useState<string[]>([]);
	const [error, setError] = useState(false);

	const { addQuery, editQuery } = useCanvasStore();
	const generateId = useUniqueId();

	const toggleWord = (word: string) => {
		setSelectedWords((prev) =>
			prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word],
		);
		setError(false);
	};

	const handleClose = () => {
		nextModalRef.current?.close?.();
		setQueryText("");
		setSelectedWords([]);
		setError(false);
	};

	const handleReturnModal = () => {
		setSelectedWords([]);
		setError(false);
		nextModalRef.current?.close?.();
		modalRef.current?.showModal?.();
	};

	const handleSubmitQuery = () => {
		if (!queryText.trim() || selectedWords.length === 0) {
			setError(true);
			return;
		}

		const queryData = {
			id: mode === "create" ? generateId() : queryEdit?.id || "",
			full_query: queryText,
			collections: selectedWords,
		};

		mode === "create"
			? addQuery(queryData)
			: editQuery(queryData.id, queryData);

		handleClose();
	};

	return (
		<Modal title="Nueva Consulta" modalRef={nextModalRef} onClose={() => {}}>
			<>
				<div className="my-13 gap-5 w-160 flex justify-between items-start flex-col relative">
					<p className="text-h3 text-secondary-white mb-2">
						Escoge tus colecciones
					</p>

					<div className="flex flex-wrap gap-3">
						{words.map((word, index) => (
							<button
								key={`${index}-${word}`}
								type="button"
								onClick={() => toggleWord(word)}
								className={clsx(
									"cursor-pointer px-4 py-2 rounded-lg border border-gray transition-colors duration-200",
									selectedWords.includes(word)
										? "bg-gray text-white"
										: "bg-transparent text-secondary-white",
								)}
								aria-pressed={selectedWords.includes(word)}
								aria-label={`Seleccionar colección ${word}`}
							>
								{word}
							</button>
						))}
					</div>

					{error && (
						<p className="text-red-500 mt-4 text-sm">
							Debes seleccionar al menos una palabra y escribir una consulta.
						</p>
					)}

					<Button
						onClick={handleReturnModal}
						className="cursor-pointer absolute top-[-97px] left-0 group transition-all duration-600"
						aria-label="Volver"
					>
						<ArrowLeft className="text-secondary-white group-hover:text-white !w-auto !h-[26px]" />
					</Button>
				</div>

				<div className="flex justify-end gap-5">
					<Button
						variant="outline"
						type="button"
						onClick={handleClose}
						className="cursor-pointer text-h3 text-white bg-red border-none hover:bg-red-dark hover:text-white"
						aria-label="Cancelar"
					>
						Cancelar
					</Button>
					<Button
						variant="outline"
						type="button"
						onClick={handleSubmitQuery}
						className="cursor-pointer text-h3 text-white bg-green border-none hover:bg-green-dark hover:text-white"
						aria-label={mode === "edit" ? "Guardar cambios" : "Crear consulta"}
					>
						{mode === "edit" ? "Guardar cambios" : "Crear consulta"}
					</Button>
				</div>
			</>
		</Modal>
	);
};
