import React, { useState } from "react";
import { type Node, useReactFlow } from "@xyflow/react";
import { ManagedDropdownMenu } from "@/components/managed-dropdown-menu";
import type { AttributeNodeProps, TableData, TableNodeProps, Column } from "../types";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreButton } from "./MoreButton";
// import AtributesModal from "./AtributesModal";
import ModalDocument from "./ModalDocument";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCanvasStore } from "@/state/canvaStore";
import getKeySegment from "@/lib/getKeySegment";
import ModalAtributes from "./ModalAtributes";

const AttributeNode = ({ column, columnId }: AttributeNodeProps) => {
	const { nodes, editNode } = useCanvasStore.getState();

	const handleDeleteAttribute = (column: Column) => {
		const numLayers = columnId.split("-").length;

		// Get the root node (top-level) from the global nodes state
		const rootId = getKeySegment(columnId, 1);
		const originalNode = nodes.find(
			(node) => node.id === rootId,
		) as Node<TableData>;
		if (!originalNode) return;

		// Create a deep copy of the node to safely modify it
		let editableNode: Node<TableData>;
		try {
			editableNode = structuredClone(originalNode);
		} catch (error) {
			console.error("Error cloning node:", error);
			return;
		}

		// If the table is at the first nested level, delete the column directly
		if (numLayers === 2) {
			editableNode.data.columns = editableNode.data.columns.filter(
				(col) => col.id !== column.id,
			);
			editNode(editableNode.id, editableNode);
			return;
		}

		// Recursive function to navigate and delete the column from deeper nested tables
		const recursiveDeleteColumn = (
			nestedTables: TableData,
			layer: number,
		): TableData => {
			if (layer === numLayers - 1) {
				nestedTables.columns = nestedTables.columns.filter(
					(col) => col.id !== column.id,
				);
				return nestedTables;
			}

			const nestedTableResultId = getKeySegment(columnId, layer + 1);
			const nestedTableResult = nestedTables.nestedTables?.map((nestedTable) =>
				nestedTable.id === nestedTableResultId
					? recursiveDeleteColumn(nestedTable, layer + 1)
					: nestedTable,
			) as TableData[];

			return {
				...nestedTables,
				nestedTables: nestedTableResult,
			};
		};

		editableNode.data = recursiveDeleteColumn(editableNode.data, 1);
		editNode(rootId as string, editableNode);
	};

	return (
		<div className="table-attribute">
			<span className="text-white">{column.name}</span>
			<div>
				<span className="text-lighter-gray">{column.type}</span>
				<div className="table-attribute__options">
					<ManagedDropdownMenu>
						{column.type !== "PRIMARY_KEY" && column.type !== "FOREIGN_KEY" ? (
							<DropdownMenuTrigger asChild>
								<MoreButton
									className="text-lighter-gray "
									onClick={(e) => {
										e.stopPropagation();
									}}
								/>
							</DropdownMenuTrigger>
						) : (
							<div className="w-4 h-8 " />
						)}
						<DropdownMenuContent
							className="z-50 "
							side="right"
							variant="menu-1"
						>
							<DropdownMenuItem type="normal" onClick={() => {}}>
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Pencil</title>
									<path
										d="M13.9681 2.03162C13.0364 1.09994 11.5258 1.09998 10.5942 2.03172L2.62751 9.99934C2.35663 10.2703 2.16623 10.611 2.07749 10.9837L1.3471 14.0513C1.30689 14.2203 1.35718 14.3979 1.47995 14.5207C1.60273 14.6435 1.78041 14.6938 1.94932 14.6536L5.01682 13.9232C5.38962 13.8344 5.73047 13.644 6.00143 13.373L12.6665 6.70713C13.1186 7.16303 13.1175 7.89913 12.663 8.35357L11.4741 9.54252C11.2788 9.73778 11.2788 10.0544 11.4741 10.2496C11.6693 10.4449 11.9859 10.4449 12.1812 10.2496L13.3701 9.06068C14.2151 8.2157 14.2163 6.84641 13.3736 5.99998L13.9682 5.40529C14.8997 4.47364 14.8997 2.96322 13.9681 2.03162ZM11.3013 2.73878C11.8425 2.19761 12.7198 2.19758 13.261 2.73872C13.8021 3.27982 13.8021 4.1571 13.261 4.69823L5.29429 12.6659C5.15419 12.806 4.97795 12.9045 4.7852 12.9504L2.5081 13.4926L3.0503 11.2153C3.09618 11.0226 3.19462 10.8465 3.33466 10.7064L11.3013 2.73878Z"
										fill="#DFDFDF"
									/>
								</svg>
								Editar
							</DropdownMenuItem>
							<DropdownMenuSeparator className="bg-gray" />
							<DropdownMenuItem
								type="delete"
								className="text-red"
								onClick={() => handleDeleteAttribute(column)}
							>
								<svg
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Trash</title>
									<path
										d="M6.25 3.125H8.75C8.75 2.43464 8.19036 1.875 7.5 1.875C6.80964 1.875 6.25 2.43464 6.25 3.125ZM5.3125 3.125C5.3125 1.91688 6.29188 0.9375 7.5 0.9375C8.70812 0.9375 9.6875 1.91688 9.6875 3.125H13.2812C13.5401 3.125 13.75 3.33487 13.75 3.59375C13.75 3.85263 13.5401 4.0625 13.2812 4.0625H12.4568L11.7243 11.632C11.608 12.8334 10.5984 13.75 9.39144 13.75H5.60856C4.40159 13.75 3.39197 12.8334 3.27571 11.632L2.54317 4.0625H1.71875C1.45987 4.0625 1.25 3.85263 1.25 3.59375C1.25 3.33487 1.45987 3.125 1.71875 3.125H5.3125ZM6.5625 6.09375C6.5625 5.83487 6.35263 5.625 6.09375 5.625C5.83487 5.625 5.625 5.83487 5.625 6.09375V10.7812C5.625 11.0401 5.83487 11.25 6.09375 11.25C6.35263 11.25 6.5625 11.0401 6.5625 10.7812V6.09375ZM8.90625 5.625C9.16513 5.625 9.375 5.83487 9.375 6.09375V10.7812C9.375 11.0401 9.16513 11.25 8.90625 11.25C8.64737 11.25 8.4375 11.0401 8.4375 10.7812V6.09375C8.4375 5.83487 8.64737 5.625 8.90625 5.625ZM4.20885 11.5417C4.2786 12.2625 4.88437 12.8125 5.60856 12.8125H9.39144C10.1156 12.8125 10.7214 12.2625 10.7912 11.5417L11.5149 4.0625H3.48505L4.20885 11.5417Z"
										fill="#E93544"
									/>
								</svg>
								Eliminar
							</DropdownMenuItem>
						</DropdownMenuContent>
					</ManagedDropdownMenu>
				</div>
			</div>
		</div>
	);
};

/**
 * TableNodeContent component displays the content of a table node,
 * including its header, attributes, and nested tables.
 *
 * Props:
 * - All properties from TableNodeProps (data: TableData, id: string)
 * - handleDeleteTable: function to handle table deletion
 * - handleAddAtribute: function to handle attribute addition
 * - handleAddNestedTable: function to handle nested table addition
 */

export const TableNodeContent = ({ data, id }: TableNodeProps) => {
	const { setNodes } = useReactFlow();
	const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
	const [isAtributesModalOpen, setIsAtributesModalOpen] = useState(false);
	const [idNestedTableSelected, setIdNestedTableSelected] = useState<
		string | null
	>(null);
	const { nodes, editNode, removeNode } = useCanvasStore.getState();

	const generateRandomId = () => {
		const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";
		for (let i = 0; i < 8; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * characters.length),
			);
		}
		return result;
	};

	interface Atribute {
		name: string;
		type: string;
	}

	const handleAddAtribute = (newAtributes: Atribute[]) => {
		const generateNewAtributes = (newAtributes: Atribute[]) => {
			return newAtributes.map((atribute) => ({
				id: `${idNestedTableSelected}-${generateRandomId()}`,
				name: atribute.name,
				type: atribute.type,
			}));
		};

		const newAtributesWithId = generateNewAtributes(newAtributes);

		setNodes((nodes: Node[]) => {
			return nodes?.map((node: Node) => {
				if (node.id === id) {
					const tableData = node.data as TableData;

					// Recursive function to add attribute in nested tables
					const addAttributeToNested = (
						nestedTables: TableData[],
					): TableData[] => {
						return nestedTables?.map((table) => {
							if (table.id === idNestedTableSelected) {
								return {
									...table,
									columns: [...table.columns, ...newAtributesWithId],
								};
							}

							// Si no es esta tabla, buscamos en las anidadas
							if (table.nestedTables && table.nestedTables.length > 0) {
								return {
									...table,
									nestedTables: addAttributeToNested(table.nestedTables),
								};
							}

							return table;
						});
					};

					// If the table to modify is the main one
					if (tableData.id === idNestedTableSelected) {
						return {
							...node,
							data: {
								...tableData,
								columns: [...tableData.columns, ...newAtributesWithId],
							},
						};
					}

					// If the table is in the nested ones
					if (tableData.nestedTables && tableData.nestedTables.length > 0) {
						return {
							...node,
							data: {
								...tableData,
								nestedTables: addAttributeToNested(tableData.nestedTables),
							},
						};
					}
				}
				return node;
			});
		});
	};

	const handleAddNestedTable = (tableName: string) => {
		const newNestedTable: TableData = {
			id: `${idNestedTableSelected}-${generateRandomId()}`,
			label: tableName,
			columns: [
				{
					id: `${idNestedTableSelected}-${generateRandomId()}`,
					name: `${tableName}_id`,
					type: "PRIMARY_KEY",
				},
			],
			nestedTables: [],
		};

		setNodes((nodes: Node[]) => {
			return nodes?.map((node: Node) => {
				if (node.id === id) {
					const tableData = node.data as TableData;

					// Recursive function to add nested table to nested tables
					const addNestedTableToNested = (
						nestedTables: TableData[],
					): TableData[] => {
						return nestedTables?.map((table) => {
							if (table.id === idNestedTableSelected) {
								// If we find the table, add the new nested table
								return {
									...table,
									nestedTables: [...(table.nestedTables || []), newNestedTable],
								};
							}

							// If it's not this table, search in the nested ones
							if (table.nestedTables && table.nestedTables.length > 0) {
								return {
									...table,
									nestedTables: addNestedTableToNested(table.nestedTables),
								};
							}

							return table;
						});
					};

					// If the table to modify is the main one
					if (tableData.id === idNestedTableSelected) {
						return {
							...node,
							data: {
								...tableData,
								nestedTables: [
									...(tableData.nestedTables || []),
									newNestedTable,
								],
							},
						};
					}

					// If the table is in the nested ones
					if (tableData.nestedTables && tableData.nestedTables.length > 0) {
						return {
							...node,
							data: {
								...tableData,
								nestedTables: addNestedTableToNested(tableData.nestedTables),
							},
						};
					}
				}
				return node;
			});
		});
	};

	const handleDeleteTable = (tableId: string) => {
		const numLayers = tableId.split("-").length;

		// Get the root node (top-level) from the global nodes state
		const rootId = getKeySegment(tableId, 1);
		const originalNode = nodes.find(
			(node) => node.id === rootId,
		) as Node<TableData>;
		if (!originalNode) return;

		// Create a deep copy of the node to safely modify it
		let editableNode: Node<TableData>;
		try {
			editableNode = structuredClone(originalNode);
		} catch (error) {
			console.error("Error cloning node:", error);
			return;
		}

		// If the table is at the first nested level, delete the table directly
		if (numLayers === 1) {
			removeNode(tableId);
			return;
		}

		// Recursive function to navigate and delete the nestedTable from deeper nested tables
		const recursiveDeleteTable = (
			nestedTables: TableData,
			layer: number,
		): TableData => {
			if (layer === numLayers - 1) {
				nestedTables.nestedTables = nestedTables.nestedTables?.filter(
					(nestedTable) => nestedTable.id !== tableId,
				);
				return nestedTables;
			}

			const nestedTableResultId = getKeySegment(tableId, layer + 1);
			const nestedTableResult = nestedTables.nestedTables?.map((nestedTable) =>
				nestedTable.id === nestedTableResultId
					? recursiveDeleteTable(nestedTable, layer + 1)
					: nestedTable,
			) as TableData[];

			return {
				...nestedTables,
				nestedTables: nestedTableResult,
			};
		};

		editableNode.data = recursiveDeleteTable(editableNode.data, 1);
		editNode(rootId as string, editableNode);
	};

	return (
		<>
			<div className="table">
				<div className="table-header text-white">
					<span>{data.label}</span>

					<ManagedDropdownMenu>
						<DropdownMenuTrigger asChild>
							<MoreButton className="hover:text-lighter-gray" />
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="z-50 "
							side="right"
							variant="menu-1"
						>
							<DropdownMenuItem type="normal">
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Pencil</title>
									<path
										d="M13.9681 2.03162C13.0364 1.09994 11.5258 1.09998 10.5942 2.03172L2.62751 9.99934C2.35663 10.2703 2.16623 10.611 2.07749 10.9837L1.3471 14.0513C1.30689 14.2203 1.35718 14.3979 1.47995 14.5207C1.60273 14.6435 1.78041 14.6938 1.94932 14.6536L5.01682 13.9232C5.38962 13.8344 5.73047 13.644 6.00143 13.373L12.6665 6.70713C13.1186 7.16303 13.1175 7.89913 12.663 8.35357L11.4741 9.54252C11.2788 9.73778 11.2788 10.0544 11.4741 10.2496C11.6693 10.4449 11.9859 10.4449 12.1812 10.2496L13.3701 9.06068C14.2151 8.2157 14.2163 6.84641 13.3736 5.99998L13.9682 5.40529C14.8997 4.47364 14.8997 2.96322 13.9681 2.03162ZM11.3013 2.73878C11.8425 2.19761 12.7198 2.19758 13.261 2.73872C13.8021 3.27982 13.8021 4.1571 13.261 4.69823L5.29429 12.6659C5.15419 12.806 4.97795 12.9045 4.7852 12.9504L2.5081 13.4926L3.0503 11.2153C3.09618 11.0226 3.19462 10.8465 3.33466 10.7064L11.3013 2.73878Z"
										fill="#DFDFDF"
									/>
								</svg>
								Editar
							</DropdownMenuItem>

							<DropdownMenuSeparator className="bg-gray" />
							<DropdownMenuItem
								type="normal"
								onClick={(e) => {
									e.preventDefault();
									setIdNestedTableSelected(data.id as string);
									setIsAtributesModalOpen(true);
								}}
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Plus</title>
									<path
										d="M8 4.66667C8.27614 4.66667 8.5 4.89052 8.5 5.16667V7.5H10.8333C11.1095 7.5 11.3333 7.72386 11.3333 8C11.3333 8.27614 11.1095 8.5 10.8333 8.5H8.5V10.8333C8.5 11.1095 8.27614 11.3333 8 11.3333C7.72386 11.3333 7.5 11.1095 7.5 10.8333V8.5H5.16667C4.89052 8.5 4.66667 8.27614 4.66667 8C4.66667 7.72386 4.89052 7.5 5.16667 7.5H7.5V5.16667C7.5 4.89052 7.72386 4.66667 8 4.66667ZM2 4.16667C2 2.97005 2.97005 2 4.16667 2H11.8333C13.03 2 14 2.97005 14 4.16667V11.8333C14 13.03 13.03 14 11.8333 14H4.16667C2.97005 14 2 13.03 2 11.8333V4.16667ZM4.16667 3C3.52233 3 3 3.52233 3 4.16667V11.8333C3 12.4777 3.52233 13 4.16667 13H11.8333C12.4777 13 13 12.4777 13 11.8333V4.16667C13 3.52233 12.4777 3 11.8333 3H4.16667Z"
										fill="#747474"
									/>
								</svg>
								Agregar atributos
							</DropdownMenuItem>
							<DropdownMenuSeparator className="bg-gray" />
							<DropdownMenuItem
								type="normal"
								onClick={(e) => {
									e.preventDefault();
									setIdNestedTableSelected(data.id as string);
									setIsDocumentModalOpen(true);
								}}
							>
								<div className="flex items-center gap-2">
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<title>Nested document</title>
										<path
											d="M12.3332 13.3334C12.3332 13.5167 12.1838 13.6667 11.9998 13.6667H8.17836C7.98691 14.0341 7.74435 14.3705 7.46012 14.6667H11.9998C12.7358 14.6667 13.3332 14.0694 13.3332 13.3334V6.55204C13.3332 6.19871 13.1925 5.85937 12.9425 5.60937L9.0565 1.72404C9.04654 1.71407 9.03524 1.70543 9.02403 1.69684C9.01574 1.69049 9.00749 1.68417 8.99984 1.67737C8.9525 1.63471 8.90584 1.59271 8.85384 1.55737C8.83699 1.546 8.81854 1.53702 8.80018 1.52809C8.78948 1.52288 8.77881 1.51769 8.7685 1.51204C8.75737 1.50577 8.74628 1.49935 8.73517 1.49292C8.69904 1.47202 8.66275 1.45102 8.6245 1.43471C8.49317 1.38004 8.35184 1.35271 8.2085 1.34271C8.19537 1.34187 8.18235 1.34009 8.1693 1.33831C8.15123 1.33585 8.13309 1.33337 8.1145 1.33337H3.99984C3.26384 1.33337 2.6665 1.93071 2.6665 2.66671V7.66548C2.98262 7.53366 3.3177 7.4382 3.6665 7.38434V2.66671C3.6665 2.48337 3.81584 2.33337 3.99984 2.33337H7.99984V5.33337C7.99984 6.06937 8.59717 6.66671 9.33317 6.66671H12.3332V13.3334ZM8.99984 3.08071L11.5852 5.66671H9.33317C9.14917 5.66671 8.99984 5.51671 8.99984 5.33337V3.08071ZM7.99984 11.6667C7.99984 9.64166 6.35821 8.00004 4.33317 8.00004C2.30813 8.00004 0.666504 9.64166 0.666504 11.6667C0.666504 13.6918 2.30813 15.3334 4.33317 15.3334C6.35821 15.3334 7.99984 13.6918 7.99984 11.6667ZM4.66693 12L4.66724 13.6691C4.66724 13.8531 4.518 14.0024 4.33391 14.0024C4.14981 14.0024 4.00058 13.8531 4.00058 13.6691L4.00027 12H2.33024C2.14632 12 1.99723 11.8508 1.99723 11.6667C1.99723 11.4826 2.14632 11.3334 2.33024 11.3334H4.00014L3.99984 9.66622C3.99984 9.48212 4.14908 9.33289 4.33317 9.33289C4.51727 9.33289 4.6665 9.48212 4.6665 9.66622L4.66681 11.3334H6.3309C6.51481 11.3334 6.6639 11.4826 6.6639 11.6667C6.6639 11.8508 6.51481 12 6.3309 12H4.66693Z"
											fill="#747474"
										/>
									</svg>
									Agregar documentos
								</div>
							</DropdownMenuItem>

							<DropdownMenuSeparator className="bg-gray" />
							<DropdownMenuItem
								type="delete"
								className="text-red"
								onClick={() => handleDeleteTable(data.id as string)}
							>
								<svg
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Trash</title>
									<path
										d="M6.25 3.125H8.75C8.75 2.43464 8.19036 1.875 7.5 1.875C6.80964 1.875 6.25 2.43464 6.25 3.125ZM5.3125 3.125C5.3125 1.91688 6.29188 0.9375 7.5 0.9375C8.70812 0.9375 9.6875 1.91688 9.6875 3.125H13.2812C13.5401 3.125 13.75 3.33487 13.75 3.59375C13.75 3.85263 13.5401 4.0625 13.2812 4.0625H12.4568L11.7243 11.632C11.608 12.8334 10.5984 13.75 9.39144 13.75H5.60856C4.40159 13.75 3.39197 12.8334 3.27571 11.632L2.54317 4.0625H1.71875C1.45987 4.0625 1.25 3.85263 1.25 3.59375C1.25 3.33487 1.45987 3.125 1.71875 3.125H5.3125ZM6.5625 6.09375C6.5625 5.83487 6.35263 5.625 6.09375 5.625C5.83487 5.625 5.625 5.83487 5.625 6.09375V10.7812C5.625 11.0401 5.83487 11.25 6.09375 11.25C6.35263 11.25 6.5625 11.0401 6.5625 10.7812V6.09375ZM8.90625 5.625C9.16513 5.625 9.375 5.83487 9.375 6.09375V10.7812C9.375 11.0401 9.16513 11.25 8.90625 11.25C8.64737 11.25 8.4375 11.0401 8.4375 10.7812V6.09375C8.4375 5.83487 8.64737 5.625 8.90625 5.625ZM4.20885 11.5417C4.2786 12.2625 4.88437 12.8125 5.60856 12.8125H9.39144C10.1156 12.8125 10.7214 12.2625 10.7912 11.5417L11.5149 4.0625H3.48505L4.20885 11.5417Z"
										fill="#E93544"
									/>
								</svg>
								Eliminar
							</DropdownMenuItem>
						</DropdownMenuContent>
					</ManagedDropdownMenu>
				</div>
				{/* table content */}
				<div className="table-content">
					{/* table attributes */}
					<div className="table-attributes">
						{data.columns?.map((column, index) => (
							<React.Fragment key={column.id}>
								<AttributeNode column={column} columnId={column.id} />
								{index < data.columns.length - 1 && (
									<hr className="border border-gray" />
								)}
							</React.Fragment>
						))}
					</div>
					{data.nestedTables && data.nestedTables.length > 0 && (
						// table nested
						<div className="table-nesteds">
							{data.nestedTables?.map((nestedTable) => (
								<TableNodeContent
									key={nestedTable.label}
									data={nestedTable}
									id={id}
								/>
							))}
						</div>
					)}
				</div>
			</div>
			{isDocumentModalOpen && (
				<ModalDocument
					open={isDocumentModalOpen}
					setOpen={setIsDocumentModalOpen}
					onSubmit={handleAddNestedTable}
				/>
			)}
			{isAtributesModalOpen && (
				<ModalAtributes
					open={isAtributesModalOpen}
					setOpen={setIsAtributesModalOpen}
					onSubmit={handleAddAtribute}
				/>
			)}
		</>
	);

};
