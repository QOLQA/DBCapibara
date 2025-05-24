import { useCallback } from "react";
import type {  Edge,  Connection,  Node } from "@xyflow/react";
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
  editNode: (nodeId: string, newNode: Node<TableData>) => void;
  addEdge: (edge: Edge) => void;
  onError?: () => void;
}

export const useTableConnections = ({
  nodes,
  editNode,
  addEdge,
  onError,
}: UseTableConnectionsProps) => {
  const handleConnect = useCallback(
    (params: Connection) => {
      const sourceNode = nodes.find(
        (node) => node.id === params.source
      ) as Node<TableData>;
      const targetNode = nodes.find(
        (node) => node.id === params.target
      ) as Node<TableData>;

      if (!sourceNode || !targetNode) return;

      if (!existsConnection(sourceNode.data, targetNode.data)) {
        const updatedTargetNode = structuredClone(targetNode);

        updatedTargetNode.data.columns.push({
          id: `e-${updatedTargetNode.id}-${sourceNode.id}`,
          name: `${sourceNode.data.label}_id`,
          type: "FOREIGN_KEY",
        });

        // Reemplazar el nodo modificado en el store
        editNode(targetNode.id, updatedTargetNode);

        // Crear la arista
        const newEdge: Edge = {
          id: `e-${sourceNode.id}-${targetNode.id}`,
          source: sourceNode.id,
          target: targetNode.id,
        };

        addEdge(newEdge);
      } else {
        onError?.();
      }
    },
    [addEdge, nodes, editNode, onError]
  );

  return { handleConnect };
};
