import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useRef, useState, type RefObject } from "react";
import { ModalSelectDocs } from "./ModalSelectDocs";
import type { Query } from "../../types";

type ModalProps = {
	modalRef: RefObject<HTMLDialogElement | null>;
	queryEdit?: Query;
	mode: "create" | "edit";
};

export const ModalNewQuery = ({
	modalRef,
	mode = "create",
	queryEdit,
}: ModalProps) => {
	const nextModalRef = useRef<HTMLDialogElement>(null);

	const handleClose = () => {
		modalRef.current?.close();
		setNewQuery("");
	};

	const handleSubmit = () => {
		modalRef.current?.close();
		nextModalRef.current?.showModal();
	};

	const [newQuery, setNewQuery] = useState("");
	if (mode === "edit") {
		setNewQuery(queryEdit?.full_query || "");
	}

	return (
		<>
			<Modal title="Nueva Consulta" modalRef={modalRef} onClose={() => {}}>
				<>
					<div className="my-13 gap-5 flex justify-between items-start flex-col">
						<label
							htmlFor="docName"
							className="text-h3 text-secondary-white pr-12"
						>
							Nombre
						</label>
						<textarea
							placeholder="Escribe tu consulta"
							id="docName"
							value={newQuery}
							onChange={(e) => setNewQuery(e.target.value)}
							className="text-h4 w-160 h-36 py-3 px-5 border border-gray rounded-md bg-terciary-gray focus:outline-none"
						/>
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
			<ModalSelectDocs
				nextModalRef={nextModalRef}
				modalRef={modalRef}
				queryText={newQuery}
				queryEdit={queryEdit}
				mode={mode}
				setNewQuery={setNewQuery}
			/>
		</>
	);
};
