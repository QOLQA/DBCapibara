import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

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

	return createPortal(
		<dialog
			ref={modalRef}
			className="bg-primary-gray p-6 m-auto text-white rounded-xl shadow-lg w-96 backdrop:bg-black/50 backdrop:backdrop-blur-sm open:animate-fade-in"
			onClose={onClose}
		>
			<h2 className="text-lg font-semibold mb-4">Nuevo Documento</h2>
			<hr />
			<div className="mt-4 flex justify-between items-center">
				<label htmlFor="docName" className="text-sm font-medium">
					Nombre
				</label>
				<input
					type="text"
					id="docName"
					className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
					placeholder="Nombre del documento"
					value={docName}
					onChange={(e) => setDocName(e.target.value)}
				/>
			</div>

			<div className="flex justify-end gap-2 mt-4">
				<Button
					variant={"outline"}
					type="button"
					onClick={handleSubmit}
					className="cursor-pointer text-white bg-blue border-none hover:bg-blue-dark hover:text-white"
				>
					Crear Modelo
				</Button>
			</div>
		</dialog>,
		document.body,
	);
};

export default AddDocumentModal;
