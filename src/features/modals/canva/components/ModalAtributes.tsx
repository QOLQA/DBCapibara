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
import { Trash } from "lucide-react";
import { useState } from "react";

interface Atribute {
	name: string;
	type: string;
}

interface ModalAtributesProps {
	onSubmit: (newAtributes: Atribute[]) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
	type?: "create" | "update";
}

const types = [
	{ value: "VARCHAR(255)", label: "VARCHAR(255)" },
	{ value: "INT", label: "INT" },
	{ value: "BOOLEAN", label: "BOOLEAN" },
	{ value: "DATE", label: "DATE" },
	{ value: "ARRAY", label: "ARRAY" },
];

const ModalAtributes: React.FC<ModalAtributesProps> = ({
	onSubmit,
	open,
	setOpen,
	type = "create",
}) => {
	const [newAtributes, setNewAtributes] = useState<Atribute[]>([
		{ name: "", type: types[0].value },
	]);

	const handleSubmit = () => {
		onSubmit(newAtributes);
		setOpen(false);
	};

	const handleAddNewAtribute = () => {
		setNewAtributes([...newAtributes, { name: "", type: types[0].value }]);
	};

	// return <Modal title={typeModal} onClose={handleClose} onSubmit={handleSubmit} modalRef={modalRef} >
	return (
		<Modal
			title={type === "create" ? "Agregar Atributos" : "Editar Atributos"}
			onSubmit={handleSubmit}
			open={open}
			setOpen={setOpen}
			type={type}
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
									{types.map((type) => (
										<SelectItem key={type.value} value={type.value}>
											{type.label}
										</SelectItem>
									))}
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
							<Trash className="text-gray-400 group-hover:text-red-500 transition-colors" />
						</button>
					</div>
				))}
				{type === "create" && (
					<div className="flex justify-center w-full border-dashed border-2 border-gray rounded-lg p-3">
						<Button
							className="cursor-pointer py-[2px] hover:bg-gray bg-transparent rounded-lg text-secondary-white  border border-gray"
							onClick={handleAddNewAtribute}
						>
							nuevo atributo
						</Button>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default ModalAtributes;
