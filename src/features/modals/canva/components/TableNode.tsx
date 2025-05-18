import { Handle, Position } from "@xyflow/react";
import type { NodeTypes } from "@xyflow/react";

import type { Node } from "@xyflow/react";
import { useReactFlow } from "@xyflow/react";
import type { TableData, TableNodeProps } from "../types";
import { TableNodeContent } from "./TableNodeContent";

// Custom node types
export const TableNode = ({ data, id }: TableNodeProps) => {
  const { setNodes } = useReactFlow();

  const handleDeleteTable = () => {
    setNodes((nodes: Node[]) => {
      return nodes
        .map((node: Node) => {
          const findAndRemoveNestedTable = (
            tables: TableData[] | undefined
          ): TableData[] | undefined => {
            if (!tables || tables.length === 0) return tables;

            const filteredTables = tables.filter(
              (table) => table.label !== data.label
            );

            if (filteredTables.length < tables.length) {
              return filteredTables;
            }

            return filteredTables.map((table) => ({
              ...table,
              nestedTables: findAndRemoveNestedTable(table.nestedTables),
            }));
          };

          if (node.data.label === data.label) {
            return null;
          }

          return {
            ...node,
            data: {
              ...node.data,
              nestedTables: findAndRemoveNestedTable(
                node.data.nestedTables as TableData[] | undefined
              ),
            },
          };
        })
        .filter(Boolean) as Node[];
    });
  };

  return (
    // table
    <div className="relative">
      <Handle
        className="customHandle"
        type="target"
        position={Position.Left}
        isConnectableStart={false}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          border: "2px solid #fff",
        }}
      />
      <TableNodeContent
        data={data}
        handleDeleteTable={handleDeleteTable}
        id={id}
      />
    </div>
  );
};

export const nodeTypes = {
  table: TableNode,
} satisfies NodeTypes;
