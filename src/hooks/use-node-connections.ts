import { useCallback } from "react";
import { addEdge, type Edge, type Connection, type Node } from "@xyflow/react";
import type { TableData } from "@/features/modals/canva/types";

export const existsConnection = (
  sourceTable: TableData,
  targetTable: TableData
) => {
  const sourceColumns = sourceTable.columns.map((col) => col.name);
  const targetColumns = targetTable.columns.map((col) => col.name);

  return (
    sourceColumns.some((col) => col.includes(targetTable.label)) ||
    targetColumns.some((col) => col.includes(sourceTable.label))
  );
};

interface UseTableConnectionsProps {
  nodes: Node<TableData>[];
  edges: Edge[];
  setNodes: (nodes: Node<TableData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  onError?: () => void;
}

export const useTableConnections = ({
  nodes,
  edges,
  setNodes,
  setEdges,
  onError,
}: UseTableConnectionsProps) => {
  const handleConnect = useCallback(
    (params: Connection) => {
      const sourceNode = nodes.find(
        (node) => node.id === params.source
      ) as Node<TableData>;
      const index = nodes.findIndex((node) => node.id === params.target);
      const targetNode = { ...nodes[index] };

      if (!existsConnection(sourceNode.data, targetNode.data)) {
        const newAttribute = {
          id: `e-${targetNode?.data.columns}`,
          name: `${sourceNode?.data.label}_id`,
          type: "FOREIGN_KEY",
        };
        targetNode.data.columns.push(newAttribute);
        const newNodes = [...nodes];
        newNodes[index] = targetNode;
        setNodes(newNodes);
        setEdges(addEdge(params, edges));
      } else {
        onError?.();
      }
    },
    [setEdges, nodes, edges, setNodes, onError]
  );

  return { handleConnect };
};
