import { useRef } from "react";
import { ModalNewQuery } from "./ModalNewQuery";

export const BtnNewQuery = () => {
	const modalRef = useRef<HTMLDialogElement>(null);
	return (
		<>
			<button
				type="button"
				onClick={() => {
					if (modalRef.current) modalRef.current.showModal();
				}}
				className="w-full h-auto py-4 flex justify-center rounded-xl items-center border border-dashed border-lighter-gray bg-transparent text-lighter-gray"
			>
				<div className="py-1.5 px-5 border border-lighter-gray bg-transparent rounded-lg text-h5 hover:bg-lighter-gray hover:text-gray cursor-pointer transition-all duration-500">
					Agregar Consulta
				</div>
			</button>

			<ModalNewQuery modalRef={modalRef} />
		</>
	);
};
