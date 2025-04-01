import React from 'react';
import {
  ReactFlow,
  type Node,
  type Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './DatabaseDiagram.css';

interface Column {
  id: string;
  name: string;
  type: string;
}

interface TableData {
  label: string;
  columns: Column[];
  nestedTables?: TableData[];
}

// Custom node types
const TableNode = ({ data }: { data: TableData }) => {
  return (
    <div className="table-node">
      <div className="table-header">{data.label}</div>
      <div className="table-content">
        {data.columns.map((column) => (
          <div key={column.id} className="column-row">
            <span className="column-name">{column.name}</span>
            <span className="column-type">{column.type}</span>
          </div>
        ))}
        {data.nestedTables && data.nestedTables.length > 0 && (
          <div className="nested-tables">
            {data.nestedTables.map((nestedTable, index) => (
              <div key={index} className="nested-table">
                <div className="nested-table-header">{nestedTable.label}</div>
                <div className="nested-table-content">
                  {nestedTable.columns.map((column) => (
                    <div key={column.id} className="column-row">
                      <span className="column-name">{column.name}</span>
                      <span className="column-type">{column.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const nodeTypes = {
  table: TableNode,
};

// Initial nodes representing tables and columns
const initialNodes: Node<TableData>[] = [
  {
    id: 'table1',
    type: 'table',
    position: { x: 100, y: 100 },
    data: {
      label: 'Users',
      columns: [
        { id: 'col1', name: 'id', type: 'INT' },
        { id: 'col2', name: 'name', type: 'VARCHAR(255)' },
        { id: 'col3', name: 'email', type: 'VARCHAR(255)' },
      ],
      nestedTables: [
        {
          label: 'UserPreferences',
          columns: [
            { id: 'pref1', name: 'theme', type: 'VARCHAR(50)' },
            { id: 'pref2', name: 'language', type: 'VARCHAR(10)' },
          ],
        },
        {
          label: 'UserSettings',
          columns: [
            { id: 'set1', name: 'notifications', type: 'BOOLEAN' },
            { id: 'set2', name: 'timezone', type: 'VARCHAR(50)' },
          ],
        },
      ],
    },
  },
  {
    id: 'table2',
    type: 'table',
    position: { x: 400, y: 100 },
    data: {
      label: 'Orders',
      columns: [
        { id: 'col4', name: 'id', type: 'INT' },
        { id: 'col5', name: 'user_id', type: 'INT' },
        { id: 'col6', name: 'total', type: 'DECIMAL(10,2)' },
      ],
      nestedTables: [
        {
          label: 'OrderItems',
          columns: [
            { id: 'item1', name: 'product_id', type: 'INT' },
            { id: 'item2', name: 'quantity', type: 'INT' },
            { id: 'item3', name: 'price', type: 'DECIMAL(10,2)' },
          ],
        },
      ],
    },
  },
];

// Initial edges representing relationships
const initialEdges: Edge[] = [
  {
    id: 'edge1',
    source: 'table1',
    target: 'table2',
    type: 'smoothstep',
  },
];

const DatabaseDiagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '600px' }}>
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
    </div>
  );
};

export default DatabaseDiagram; 