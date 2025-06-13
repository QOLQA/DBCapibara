import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
	Select,
	SelectValue,
	SelectItem,
	SelectGroup,
	SelectContent,
	SelectLabel,
	SelectTrigger,
} from "@/components/ui/select";
import { useState, useRef } from "react";

interface Atribute {
	name: string;
	type: string;
}

interface ModalAtributesProps {
	onSubmit: (newAtributes: Atribute[]) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
}

const ModalAtributes: React.FC<ModalAtributesProps> = ({
	onSubmit,
	open,
	setOpen,
}) => {
	const [newAtributes, setNewAtributes] = useState<Atribute[]>([
		{ name: "", type: "" },
	]);
	const [showFormNewAtribute, setShowFormNewAtribute] = useState(false);

	const handleSubmit = () => {
		onSubmit(newAtributes);
		setOpen(false);
	};

	const [newTableName, setNewTableName] = useState("");
	const modalRef = useRef<HTMLDialogElement>(null);

	const handleAddNewAtribute = () => {
		setNewAtributes([...newAtributes, { name: "", type: "" }]);
	};

	// return <Modal title={typeModal} onClose={handleClose} onSubmit={handleSubmit} modalRef={modalRef} >
	return (
		<Modal
			title="Agregar Atributos"
			onSubmit={handleSubmit}
			open={open}
			setOpen={setOpen}
		>
			<div className="flex flex-col gap-2">
				{newAtributes.map((atribute, idx) => (
					<div key={idx} className="flex items-center gap-6 mb-2">
						<Input
							placeholder="Nombre"
							value={atribute.name}
							onChange={(e) => {
								const updated = [...newAtributes];
								updated[idx].name = e.target.value;
								setNewAtributes(updated);
							}}
							className="w-1/2"
						/>

						<Select
							value={atribute.type}
							onValueChange={(value) => {
								const updated = [...newAtributes];
								updated[idx].type = value;
								setNewAtributes(updated);
							}}
						>
							<SelectTrigger className="w-1/2">
								<SelectValue placeholder="Type" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Type</SelectLabel>
									<SelectItem value="VARCHAR(255)">VARCHAR(255)</SelectItem>
									<SelectItem value="INT">INT</SelectItem>
									<SelectItem value="BOOLEAN">BOOLEAN</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<button
							type="button"
							className="group cursor-pointer"
							onClick={() => {
								setNewAtributes(newAtributes.filter((_, i) => i !== idx));
							}}
						>
							<svg
								className="fill-current text-gray-400 group-hover:text-gray-500 transition-colors"
								width="14"
								height="14"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Remove attribute</title>
								<path d="M0.209704 0.387101L0.292893 0.292893C0.653377 -0.0675905 1.22061 -0.0953204 1.6129 0.209704L1.70711 0.292893L8 6.585L14.2929 0.292893C14.6834 -0.0976309 15.3166 -0.0976309 15.7071 0.292893C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.415 8L15.7071 14.2929C16.0676 14.6534 16.0953 15.2206 15.7903 15.6129L15.7071 15.7071C15.3466 16.0676 14.7794 16.0953 14.3871 15.7903L14.2929 15.7071L8 9.415L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292893 15.7071C-0.0976309 15.3166 -0.0976309 14.6834 0.292893 14.2929L6.585 8L0.292893 1.70711C-0.0675905 1.34662 -0.0953204 0.779392 0.209704 0.387101L0.292893 0.292893L0.209704 0.387101Z" />
							</svg>
						</button>
					</div>
				))}
				<div className="flex justify-center w-full border-dashed border-2 border-gray rounded-lg p-3">
					<Button
						className="cursor-pointer py-[2px] hover:bg-gray bg-transparent rounded-lg text-secondary-white  border border-gray"
						onClick={handleAddNewAtribute}
					>
						nuevo atributo
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default ModalAtributes;
