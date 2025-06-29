import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogOverlay,
} from "./dialog";
import type { ReactElement } from "react";
import { Button } from "./button";

import { createPortal } from "react-dom";
import React from "react";

interface ModalProps {
	title: string;
	children: ReactElement;
	onSubmit?: () => void;
	open: boolean;
	setOpen: (open: boolean) => void;
	type?: "create" | "update" | "next" | "save";
	showCloseButton?: boolean;
}

export const Modal = React.memo(function Modal({
	title,
	children,
	onSubmit,
	open,
	setOpen,
	type = "create",
	showCloseButton = true,
}: ModalProps) {
	return createPortal(
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogOverlay className="bg-[#000000]/80 backdrop-blur-xs" />
			<DialogContent
				className="w-[730px] bg-primary-gray border-2 border-gray"
				showCloseButton={showCloseButton}
			>
				<DialogHeader className="flex flex-row items-center justify-between">
					<DialogTitle className="text-white">{title}</DialogTitle>
				</DialogHeader>
				<div className="w-full h-[2px] bg-gray" />

				<div className="my-4">{children}</div>

				<DialogFooter>
					<div className="flex justify-between gap-4">
						{type !== "next" && (
							<DialogClose asChild>
								<Button
									variant={"outline"}
									type="button"
									className="w-[6rem] cursor-pointer text-h3 text-white bg-red border-none hover:bg-red-dark hover:text-white"
								>
									Cancelar
								</Button>
							</DialogClose>
						)}
						<DialogClose asChild>
							<Button
								variant={"outline"}
								type="button"
								onClick={() => onSubmit?.()}
								className="w-[6rem] cursor-pointer text-h3 text-white bg-green border-none hover:bg-green-dark hover:text-white"
							>
								{type === "create"
									? "Crear"
									: type === "update"
										? "Actualizar"
										: type === "next"
											? "Siguiente"
											: "Guardar"}
							</Button>
						</DialogClose>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>,
		document.body,
	);
});
