import type { ReactElement } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
	onClose: () => void;
	modalRef: React.RefObject<HTMLDialogElement | null>;
	title: string;
	children: ReactElement;
}

export const Modal = ({ title, children, modalRef, onClose }: ModalProps) => {
	return createPortal(
		<dialog
			ref={modalRef}
			className="bg-primary-gray p-12 m-auto text-white text-h3 rounded-xl shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm open:animate-fade-in"
			onClose={onClose}
		>
			<h2 className="mb-4 text-center">{title}</h2>
			<hr />
			{children}
		</dialog>,
		document.body,
	);
};
