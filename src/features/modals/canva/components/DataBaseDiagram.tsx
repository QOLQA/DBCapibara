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

import { nodeTypes } from "./TableNode";
import AddDocumentModal from "./AddDocumentModal";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import type { TableData } from "../types";

const DatabaseDiagram = ({
  initialNodes,
  initialEdges,
}: {
  initialNodes: Node<TableData>[];
  initialEdges: Edge[];
}) => {
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
    </div>
  );
};

export default DatabaseDiagram;
