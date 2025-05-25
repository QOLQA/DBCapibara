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
				className="w-full h-auto py-4 flex justify-center rounded-xl items-center border group border-dashed border-lighter-gray bg-transparent text-lighter-gray hover:cursor-pointer hover:border-white hover:text-white"
			>
				<div className="py-1.5 px-5 border border-lighter-gray bg-transparent rounded-lg text-h5 group-hover:border-white group-hover:text-whitea ">
					Agregar Consulta
				</div>
			</button>

			<ModalNewQuery modalRef={modalRef} />
		</>
	);
};
