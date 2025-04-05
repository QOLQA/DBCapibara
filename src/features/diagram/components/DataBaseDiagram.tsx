import { useState } from "react";
import {
	ReactFlow,
	Background,
	Controls,
	MiniMap,
	useNodesState,
	useEdgesState,
} from "@xyflow/react";
import type { Node, Edge } from "@xyflow/react";
import type { TableData } from "./TableNode";

import { nodeTypes } from "./TableNode";
import AddDocumentModal from "./AddDocumentModal";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";

const DatabaseDiagram = ({
	initialNodes,
	initialEdges,
}: { initialNodes: Node<TableData>[]; initialEdges: Edge[] }) => {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, _, onEdgesChange] = useEdgesState(initialEdges);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleAddDocument = (name: string) => {
		const newNode: Node<TableData> = {
			id: `table-${nodes.length + 1}`,
			position: { x: Math.random() * 400, y: Math.random() * 400 },
			data: {
				label: name,
				columns: [{ id: `col1${nodes.length + 1}`, name: "id", type: "INT" }],
			},
			type: "table",
		};

		setNodes((prev) => [...prev, newNode]);
	};

	return (
		<div className="w-full h-full relative">
			<Button
				type="button"
				onClick={() => setIsModalOpen(true)}
				className="absolute top-2 left-2 bg-black text-white hover:bg-blue-700 z-10 cursor-pointer"
			>
				Agregar Documento
			</Button>

			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				nodeTypes={nodeTypes}
				fitView
			>
				<Background />
				<Controls />
				<MiniMap />
			</ReactFlow>

			{isModalOpen && (
				<AddDocumentModal
					onClose={() => setIsModalOpen(false)}
					onSubmit={handleAddDocument}
				/>
			)}
		</div>
	);
};

export default DatabaseDiagram;
