import type { TableData } from "@/features/modals/canva/types";
import type { Node } from "@xyflow/react";

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
  setNodes: (nodes: Node<TableData>[]) => void;
  setEdges: (callback: (edges: any) => any) => void;
  onError?: () => void;
}
