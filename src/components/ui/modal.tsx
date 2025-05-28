import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogOverlay } from "./dialog";
import type { ReactElement } from "react";
import { Button } from "./button";

interface ModalProps {
	title: string;
	children: ReactElement;
	onSubmit?: () => void;
	open: boolean;
	setOpen: (open: boolean) => void;
}

export const Modal = ({ title, children, onSubmit, open, setOpen }: ModalProps) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogOverlay className="bg-[#000000]/80 backdrop-blur-3xl"/>
			<DialogContent className="w-[730px] bg-primary-gray border-2 border-gray">
				<DialogHeader>
					<DialogTitle className="text-white">{title}</DialogTitle>
				</DialogHeader>
				<div className="w-full h-[2px] bg-gray"></div>

				{children}
        
				<DialogFooter>
          <div className="flex justify-between gap-4">
            <DialogClose asChild>
              <Button
                variant={"outline"}
                type="button"
                className="w-[6rem] cursor-pointer text-h3 text-white bg-red border-none hover:bg-red-dark hover:text-white"
              >
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant={"outline"}
                type="button"
                onClick={() => onSubmit?.()}
                className="w-[6rem] cursor-pointer text-h3 text-white bg-green border-none hover:bg-green-dark hover:text-white"
              >
                Crear
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
