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
import { useState, useEffect } from "react";
import { useFieldArray, useForm, useController } from "react-hook-form";

interface TableAttribute {
	id: string;
	name: string;
	type: string;
	ableToEdit: boolean;
}

interface ModalAtributesProps {
	onSubmit: (
		newAtributes: TableAttribute[],
		typeModal: "create" | "update",
	) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
	type?: "create" | "update";
	atributesToUpdate?: TableAttribute[];
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
	atributesToUpdate,
}) => {
	const { register, control, handleSubmit, reset } = useForm<{
		attributes: TableAttribute[];
	}>({
		defaultValues: {
			attributes:
				type === "update" && atributesToUpdate
					? atributesToUpdate
					: [{ id: "", name: "", type: types[0].value, ableToEdit: true }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "attributes",
	});

	useEffect(() => {
		if (type === "update" && atributesToUpdate) {
			reset({ attributes: atributesToUpdate });
		} else if (type === "create") {
			reset({
				attributes: [
					{ id: "", name: "", type: types[0].value, ableToEdit: true },
				],
			});
		}
	}, [type, atributesToUpdate, reset]);

	const onSubmitForm = (data: { attributes: TableAttribute[] }) => {
		onSubmit(data.attributes, type);
		setOpen(false);
	};

	return (
		<Modal
			title={type === "create" ? "Agregar Atributos" : "Editar Atributos"}
			onSubmit={handleSubmit(onSubmitForm)}
			open={open}
			setOpen={setOpen}
			type={type}
		>
			<div className="flex flex-col gap-2">
				{fields.map((field, index) => {
					if (field.ableToEdit) {
						const { field: typeField } = useController({
							name: `attributes.${index}.type`,
							control,
						});

						return (
							<div key={field.id} className="flex items-center gap-6 mb-2">
								<Input
									placeholder="Nombre"
									{...register(`attributes.${index}.name`)}
									className="w-1/2"
								/>

								<Select
									value={typeField.value}
									onValueChange={typeField.onChange}
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
									onClick={() => remove(index)}
								>
									<Trash className="text-gray-400 group-hover:text-red-500 transition-colors" />
								</button>
							</div>
						);
					}
				})}
				{type === "create" && (
					<div className="flex justify-center w-full border-dashed border-2 border-gray rounded-lg p-3">
						<Button
							type="button"
							className="cursor-pointer py-[2px] hover:bg-gray bg-transparent rounded-lg text-secondary-white border border-gray"
							onClick={() =>
								append({
									id: "",
									name: "",
									type: types[0].value,
									ableToEdit: true,
								})
							}
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
