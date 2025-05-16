import DatabaseDiagram from "./components/DataBaseDiagram";
import { LayoutDiagram } from "./LayoutDiagram";

import type { Edge, Node } from "@xyflow/react";
import type { Route } from "./+types/DiagramView";
import { get } from "http";
import type {
  EdgeBackend,
  NestedNode,
  NodeBackend,
  SolutionModel,
  TableData,
} from "./types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

/**
 * Transforms a SolutionModel into an object with:
 * - name: the solution's name
 * - initialNodes: all nodes from all submodels, converted to TableData
 * - initialEdges: all edges from all submodels
 *
 * Each NodeBackend is mapped to TableData.
 */
export function transformSolutionModel(solution: SolutionModel): {
  name: string;
  initialNodes: Node<TableData>[];
  initialEdges: EdgeBackend[];
} {
  /**
   * Maps a NodeBackend or NestedNode to a Node<TableData> object.
   * Nested nodes are recursively mapped to nestedTables.
   * For NestedNode, missing properties like position are set to default values.
   */
  function mapNode(node: NodeBackend | NestedNode): Node<TableData> {
    const mappedNode: Node<TableData> = {
      id: node.id,
      // Use node.position if available, otherwise provide a default position for NestedNode
      position: "position" in node ? node.position : { x: 0, y: 0 },
      type: "table",
      data: {
        label: node.name,
        columns: node.cols.map((col) => ({
          id: col.id,
          name: col.name,
          type: col.type,
        })),
        // Map nested nodes to their TableData by extracting the .data property
        nestedTables: mapNestedNode(node.nested_nodes || []),
      },
    };
    return mappedNode;
  }

  function mapNestedNode(nestedNodes: NestedNode[]): TableData[] {
    return nestedNodes.map((nestedNode) => ({
      id: nestedNode.id,
      label: nestedNode.name,
      columns: nestedNode.cols.map((col) => ({
        id: col.id,
        name: col.name,
        type: col.type,
      })),
      nestedTables: mapNestedNode(nestedNode.nested_nodes || []),
    }));
  }

  const initialNodes = solution.submodels.flatMap((submodel) =>
    submodel.nodes.map((node) => mapNode(node))
  );

  const initialEdges = solution.submodels.flatMap((submodel) => submodel.edges);

  return {
    name: solution.name,
    initialNodes,
    initialEdges,
  };
}

export async function loader({ params }: Route.LoaderArgs) {
  const url = `${backendUrl}/solutions/${params.diagramId}`;

  if (import.meta.env.MODE !== "production") {
    console.log("URL", url);
  }
  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail);
  }
  return transformSolutionModel(data);
}

// Placeholder for future action functionality. This function is intentionally left empty.
export async function action() {}

export default function DiagramView({ loaderData }: Route.ComponentProps) {
  console.log("DiagramView", loaderData);

  return (
    <>
      <LayoutDiagram title={loaderData.name}>
        <DatabaseDiagram
          initialNodes={loaderData.initialNodes}
          initialEdges={loaderData.initialEdges}
        />
      </LayoutDiagram>
    </>
  );
}
