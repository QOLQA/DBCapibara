import { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import type { Node, Edge, Connection } from "@xyflow/react";
import type { TableData } from "./TableNode";

import { nodeTypes } from "./TableNode";
import AddDocumentModal from "./AddDocumentModal";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";

const connectionLineStyle = {
  stroke: "#4E4E4E",
  strokeWidth: 2,
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

  const onConnect = useCallback(
    (params: Connection) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const index = nodes.findIndex((node) => node.id === params.target);
      const targetNode = { ...nodes[index] };
      const newAttribute = {
        id: `e-${targetNode?.data.columns}`,
        name: `${sourceNode?.data.label}_id`,
        type: "FOREIGN_KEY",
      };
      targetNode.data.columns.push(newAttribute);
      const newNodes = [...nodes];
      newNodes[index] = targetNode;
      setNodes(newNodes);

      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges, nodes, setNodes]
  );

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
        onConnect={onConnect}
        connectionLineStyle={connectionLineStyle}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          style: connectionLineStyle,
        }}
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
