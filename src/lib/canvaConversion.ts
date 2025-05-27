import type { Edge, Node } from "@xyflow/react";
import type {
	NodeBackend,
	TableData,
	VersionFrontend,
	VersionBackend,
	NestedNode,
	Submodel,
	EdgeBackend,
	Query,
} from "@/features/modals/canva/types";

function tableDataToNodeBackend(node: Node<TableData>): NodeBackend {
	const convertNestedTablesToNestedNodes = (
		nestedTables?: TableData[],
	): NestedNode[] => {
		return (nestedTables || []).map((nestedTable) => ({
			id: nestedTable.id,
			name: nestedTable.label,
			cols: nestedTable.columns,
			nested_nodes: convertNestedTablesToNestedNodes(nestedTable.nestedTables),
		}));
	};

	return {
		id: node.id,
		name: node.data.label,
		type: node.type || "table",
		position: node.position,
		cols: node.data.columns,
		nested_nodes: convertNestedTablesToNestedNodes(node.data.nestedTables),
	};
}

export function transformVersionToBackend(
	version: VersionFrontend,
	nodes: Node<TableData>[],
	edges: Edge[],
	queries: Query[],
): VersionBackend {
	const nodeMap = new Map<string, Node<TableData>>();
	for (const node of nodes) {
		nodeMap.set(node.id, node);
	}

	// Crear grafo no dirigido
	const adjacencyList = new Map<string, Set<string>>();
	for (const node of nodes) {
		adjacencyList.set(node.id, new Set());
	}

	for (const edge of edges) {
		adjacencyList.get(edge.source)?.add(edge.target);
		adjacencyList.get(edge.target)?.add(edge.source);
	}

	// DFS para encontrar componentes conexas
	const visited = new Set<string>();
	const components: string[][] = [];

	function dfs(nodeId: string, currentComponent: string[]) {
		visited.add(nodeId);
		currentComponent.push(nodeId);
		for (const neighbor of adjacencyList.get(nodeId) || []) {
			if (!visited.has(neighbor)) {
				dfs(neighbor, currentComponent);
			}
		}
	}

	for (const nodeId of adjacencyList.keys()) {
		if (!visited.has(nodeId)) {
			const component: string[] = [];
			dfs(nodeId, component);
			components.push(component);
		}
	}

	// Crear submodelos por componente
	const submodels: Submodel[] = components.map((componentNodeIds) => {
		const submodelNodes: NodeBackend[] = componentNodeIds
			.map((id) => nodeMap.get(id))
			.filter((node): node is Node<TableData> => node !== undefined)
			.map((node) => tableDataToNodeBackend(node));

		const submodelEdges: EdgeBackend[] = edges
			.filter(
				(edge) =>
					componentNodeIds.includes(edge.source) &&
					componentNodeIds.includes(edge.target),
			)
			.map((edge) => ({
				id: edge.id,
				source: edge.source,
				target: edge.target,
			}));

		return {
			nodes: submodelNodes,
			edges: submodelEdges,
		};
	});

	return {
		queries: queries,
		submodels: submodels,
		description: version.description,
		solution_id: version.solution_id,
		_id: version._id,
	};
}
