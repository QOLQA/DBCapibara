import { useCanvasStore } from "@/state/canvaStore";
import type { TableData } from "@/features/modals/canva/types";

function getMaxDepth(): number {
	const nodes = useCanvasStore.getState().nodes;

	if (nodes.length === 0) return 0;

	// Recursive function to calculate nestedTables depth
	function calculateNestedDepth(tableData: TableData): number {
		if (!tableData.nestedTables || tableData.nestedTables.length === 0) {
			return 1;
		}

		const nestedDepths = tableData.nestedTables.map(nested =>
			calculateNestedDepth(nested)
		);

		return 1 + Math.max(...nestedDepths);
	}

	// Calculate maximum depth among all nodes
	const depths = nodes.map(node => calculateNestedDepth(node.data));

	return Math.max(...depths);
}

function getMaxRelations(): number {
	const edges = useCanvasStore.getState().edges;

	if (edges.length === 0) return 0;

	// Count relations per source node
	const relationCounts = new Map<string, number>();

	edges.forEach(edge => {
		const sourceId = edge.source;
		relationCounts.set(sourceId, (relationCounts.get(sourceId) || 0) + 1);
	});

	// Return the maximum number of relations that a node has as source
	return relationCounts.size > 0 ? Math.max(...relationCounts.values()) : 0;
}

export function getAccessPattern() {
	const maxDepth = getMaxDepth();
	const maxRelations = getMaxRelations();
	const accessPattern = (maxDepth * 0.4) + (maxRelations * 0.6);

	return accessPattern;
}