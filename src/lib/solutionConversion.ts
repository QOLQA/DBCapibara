import type { Node } from "@xyflow/react";
import type {
	NestedNode,
	NodeBackend,
	SolutionModel,
	TableData,
	VersionFrontend,
} from "@/features/modals/canva/types";

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
	versions: VersionFrontend[];
	solutionId: string;
	last_version_saved: string;
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

	const versions = solution.versions.map((version) => ({
		queries: version.queries,
		nodes: version.submodels.flatMap((submodel) =>
			submodel.nodes.map((node) => mapNode(node))
		),
		edges: version.submodels.flatMap((submodel) => submodel.edges),
		description: version.description,
		solution_id: version.solution_id,
		_id: version._id,
	}));

	return {
		name: solution.name,
		versions: versions,
		solutionId: solution._id,
		last_version_saved: solution.last_version_saved,
	};
}
