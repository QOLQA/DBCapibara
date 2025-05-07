import React from "react";
import { MoreButton } from "./MoreButton";
import { Handle, Position } from "@xyflow/react";
import type { NodeTypes } from "@xyflow/react";

interface Column {
  id: string;
  name: string;
  type: string;
}

export interface TableData {
  [key: string]: unknown;
  label: string;
  columns: Column[];
  nestedTables?: TableData[];
}

const AttributeNode = ({ column }: { column: Column }) => {
  return (
    <div className="table-attribute">
      <span className="text-white">{column.name}</span>
      <div>
        <span className="text-lighter-gray">{column.type}</span>
        <div className="table-attribute__options">
          <MoreButton className="text-lighter-gray" />
        </div>
      </div>
    </div>
  );
};

const DEFAULT_HANDLE_STYLE = {
  width: 20,
  height: 20,
};

// Custom node types
export const TableNode = ({ data }: { data: TableData }) => {
  return (
    // table
    <>
      <Handle
        type="target"
        position={Position.Bottom}
        style={{ ...DEFAULT_HANDLE_STYLE }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ ...DEFAULT_HANDLE_STYLE }}
      />
      <div className="table">
        {/* table header */}
        <div className="table-header text-white">
          <span>{data.label}</span>
          <MoreButton className="hover:text-lighter-gray" />
        </div>
        {/* table content */}
        <div className="table-content">
          {/* table attributes */}
          <div className="table-attributes">
            {data.columns.map((column, index) => (
              <React.Fragment key={column.id}>
                <AttributeNode column={column} />
                {index < data.columns.length - 1 && (
                  <hr className="border border-gray" />
                )}
              </React.Fragment>
            ))}
          </div>
          {data.nestedTables && data.nestedTables.length > 0 && (
            // table nested
            <div className="table-nesteds">
              {data.nestedTables.map((nestedTable) => (
                <TableNode key={nestedTable.label} data={nestedTable} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const nodeTypes = {
  table: TableNode,
} satisfies NodeTypes;
