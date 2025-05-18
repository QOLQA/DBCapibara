import { useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "@xyflow/react";
import type { Node, Edge } from "@xyflow/react";
import type { TableData } from "../types";

import { nodeTypes } from "./TableNode";
import AddDocumentModal from "./AddDocumentModal";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import ShowErrorModal from "./ShowErrorModal";
import { edgeTypes } from "./FloatingEdge";
import { useTableConnections } from "@/hooks/use-node-connections";

const connectionLineStyle = {
  stroke: "#4E4E4E",
  strokeWidth: 3,
};

const DatabaseDiagram = ({
  initialNodes,
  initialEdges,
}: {
  initialNodes: Node<TableData>[];
  initialEdges: Edge[];
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const { handleConnect } = useTableConnections({
    nodes,
    setNodes,
    setEdges,
    onError: () => setShowError(true),
  });

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
