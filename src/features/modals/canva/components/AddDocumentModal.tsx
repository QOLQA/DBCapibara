import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useState, useRef, useEffect } from "react";

interface AddDocumentModalProps {
	onClose: () => void;
	onSubmit: (name: string) => void;
}

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
	onClose,
	onSubmit,
}) => {
	const [docName, setDocName] = useState("");
	const modalRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (modalRef.current) modalRef.current.showModal();
	}, []);

	const handleSubmit = () => {
		if (docName.trim()) {
			onSubmit(docName);
			onClose();
		}
	};

	const handleClose = () => {
		if (modalRef.current) {
			modalRef.current.close();
		}
		onClose();
	};

	return (
		<Modal title="Crear Colección" modalRef={modalRef} onClose={handleClose}>
			<>
				<div className="my-13 flex justify-between items-center">
					<label htmlFor="docName" className="text-secondary-white pr-12">
						Nombre
					</label>
					<input
						type="text"
						id="docName"
						className="w-120 py-3 px-5 border border-gray rounded-md bg-terciary-gray focus:ring-2 focus:outline-none"
						value={docName}
						onChange={(e) => setDocName(e.target.value)}
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
						Crear Colección
					</Button>
				</div>
			</>
		</Modal>
	);
};

export default AddDocumentModal;
