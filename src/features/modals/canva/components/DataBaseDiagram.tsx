import { useState } from "react";
import {
	ReactFlow,
	Background,
	Controls,
	MiniMap,
	MarkerType,
} from "@xyflow/react";
import type { Node } from "@xyflow/react";
import type { TableData } from "../types";

import { nodeTypes } from "./TableNode";
import AddDocumentModal from "./AddDocumentModal";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import ShowErrorModal from "./ShowErrorModal";
import { edgeTypes } from "./FloatingEdge";
import { useTableConnections } from "@/hooks/use-node-connections";
import { type CanvasState, useCanvasStore } from "@/state/canvaStore";
import { useShallow } from "zustand/shallow";
import { useUniqueId } from "@/hooks/use-unique-id";

const connectionLineStyle = {
	stroke: "#4E4E4E",
	strokeWidth: 3,
};

const selector = (state: CanvasState) => ({
	id: state.id,
	nodes: state.nodes,
	edges: state.edges,
	editNode: state.editNode,
	addEdge: state.addEdge,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	addNode: state.addNode,
});

const DatabaseDiagram = () => {
	const {
		nodes,
		edges,
		addNode,
		editNode,
		addEdge,
		onNodesChange,
		onEdgesChange,
	} = useCanvasStore<ReturnType<typeof selector>>(useShallow(selector));

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showError, setShowError] = useState(false);
	const generateId = useUniqueId();

	const { handleConnect } = useTableConnections({
		nodes,
		editNode,
		addEdge,
		onError: () => setShowError(true),
	});

	const handleAddDocument = (name: string) => {
		const newIdNode = generateId();

		const newNode: Node<TableData> = {
			id: newIdNode,
			position: { x: Math.random() * 400, y: Math.random() * 400 },
			data: {
				id: newIdNode,
				label: name,
				columns: [
					{
						id: `${newIdNode}-${generateId()}`,
						name: "id",
						type: "PRIMARY_KEY",
					},
				],
			},
			type: "table",
		};

		addNode(newNode);
	};

	return (
		<div className="w-full h-full relative pb-[16px] pl-[5px] pr-[16px] pt-[2px]">
			<Button
				type="button"
				onClick={() => setIsModalOpen(true)}
				className="absolute top-5 right-10 bg-green text-white hover:bg-green-dark z-10 cursor-pointer"
			>
				<span className="text-xl">+</span> Nueva Colección
			</Button>

			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
				onConnect={handleConnect}
				connectionLineStyle={connectionLineStyle}
				defaultEdgeOptions={{
					type: "floating",
					style: connectionLineStyle,
					markerEnd: { type: MarkerType.ArrowClosed },
				}}
				fitView
			>
				<Background className="!bg-terciary-gray rounded-xl" />
				<Controls className="text-white controls-with-buttons " />
				<MiniMap nodeClassName="!fill-gray" className="!bg-secondary-gray" />
			</ReactFlow>

			{isModalOpen && (
				<AddDocumentModal
					onClose={() => setIsModalOpen(false)}
					onSubmit={handleAddDocument}
				/>
			)}

			{showError && (
				<ShowErrorModal
					onClose={() => setShowError(false)}
					errorMessage="Ya existe una relación entre estas tablas"
				/>
			)}
		</div>
	);
};

export default DatabaseDiagram;
