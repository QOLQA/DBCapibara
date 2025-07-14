import { useCanvasStore } from "@/state/canvaStore";
import type { TableData } from "@/features/modals/canva/types";

function getMaxDepth(): number {
	const nodes = useCanvasStore.getState().nodes;

	if (nodes.length === 0) return 0;

	// Función recursiva para calcular la profundidad de nestedTables
	function calculateNestedDepth(tableData: TableData): number {
		if (!tableData.nestedTables || tableData.nestedTables.length === 0) {
			return 1;
		}

		const nestedDepths = tableData.nestedTables.map(nested =>
			calculateNestedDepth(nested)
		);

		return 1 + Math.max(...nestedDepths);
	}

	// Calcular la profundidad máxima entre todos los nodos
	const depths = nodes.map(node => calculateNestedDepth(node.data));

	return Math.max(...depths);
}

function getMaxRelations(): number {
	const edges = useCanvasStore.getState().edges;

	if (edges.length === 0) return 0;

	// Contar las relaciones por nodo origen
	const relationCounts = new Map<string, number>();

	edges.forEach(edge => {
		const sourceId = edge.source;
		relationCounts.set(sourceId, (relationCounts.get(sourceId) || 0) + 1);
	});

	// Retornar el número máximo de relaciones que tiene un nodo como origen
	return relationCounts.size > 0 ? Math.max(...relationCounts.values()) : 0;
}

export function getAccessPattern() {
	const maxDepth = getMaxDepth();
	const maxRelations = getMaxRelations();
	const accessPattern = (maxDepth * 0.4) + (maxRelations * 0.6);

	return accessPattern;
}