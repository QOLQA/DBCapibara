export interface Column {
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

export interface AttributeNodeProps {
  column: Column;
  nodeId: string;
}

export interface TableNodeProps {
  data: TableData;
  id: string;
}

export interface Query {
  full_query: string;
  collections: string[];
}

export interface NodeBackend {
  id: string;
  name: string;
  type: string;
  cols: Column[];
  position: {
    x: number;
    y: number;
  };
  nested_nodes?: NestedNode[];
}

export interface NestedNode {
  id: string;
  name: string;
  cols: Column[];
  nested_nodes?: NestedNode[];
}

export interface EdgeBackend {
  id: string;
  source: string;
  target: string;
}

export interface Submodel {
  nodes: NodeBackend[];
  edges: EdgeBackend[];
}

export interface SolutionModel {
  _id: string;
  name: string;
  queries: Query[];
  submodels: Submodel[];
}
