import { useCanvasStore } from "@/state/canvaStore";

function getNodeNames(): string[] {
	const { nodes } = useCanvasStore.getState();
	return nodes.map(node => node.data.label);
}

function isQueryFullyHandled(collections: string[], nodeNames: string[]): boolean {
	return collections.every(collection => nodeNames.includes(collection));
}

function getHandledQueriesCount(): number {
	const { queries } = useCanvasStore.getState();
	const nodeNames = getNodeNames();

	return queries.filter(query =>
		isQueryFullyHandled(query.collections, nodeNames)
	).length;
}

export function getHandledQueries(): number {
	const { queries } = useCanvasStore.getState();
	const totalQueries = queries.length;
	const handledQueries = getHandledQueriesCount();

	if (totalQueries === 0) return 0;

	const percentage = (handledQueries / totalQueries) * 100;

	return Math.round(percentage * 100) / 100; 
}