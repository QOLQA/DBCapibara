import type { Node, Edge } from "@xyflow/react";
import type { Query, TableData } from "@/features/modals/canva/types";

// Cache to avoid unnecessary recalculations
let cachedResult: number | null = null;
let lastNodeHash: string | null = null;
let lastQueryHash: string | null = null;
let lastEdgeHash: string | null = null;

/**
 * Generates a simple hash to detect changes in data structure
 */
function generateHash<T>(data: T[]): string {
	return JSON.stringify(data.map(item =>
		typeof item === 'object' && item !== null ?
			Object.keys(item).sort().reduce((acc, key) => {
				acc[key] = (item as any)[key];
				return acc;
			}, {} as any) : item
	));
}

/**
 * Generates a specific hash for nodes excluding x,y positions
 */
function generateNodeHashWithoutPosition(nodes: Node<TableData>[]): string {
	return JSON.stringify(nodes.map(node => ({
		id: node.id,
		data: node.data,
		type: node.type
		// Intentionally exclude position to avoid recalculations on movement
	})));
}

/**
 * Gets all table names, including nested tables
 */
function getAllTableNames(nodes: Node<TableData>[]): Set<string> {
	const tableNames = new Set<string>();

	const extractNamesRecursively = (table: TableData) => {
		tableNames.add(table.label);

		// Process nested tables if they exist
		if (table.nestedTables && table.nestedTables.length > 0) {
			table.nestedTables.forEach(nestedTable => {
				extractNamesRecursively(nestedTable);
			});
		}
	};

	nodes.forEach(node => {
		extractNamesRecursively(node.data);
	});

	return tableNames;
}

/**
 * Adds bidirectional nested relationships to the graph
 */
function addNestedRelationships(
	graph: Map<string, Set<string>>,
	table: TableData,
	parentName?: string
) {
	const currentTableName = table.label;

	// Initialize current table in graph if not exists
	if (!graph.has(currentTableName)) {
		graph.set(currentTableName, new Set());
	}

	// Add bidirectional relationship with parent if exists
	if (parentName) {
		if (!graph.has(parentName)) {
			graph.set(parentName, new Set());
		}

		// Bidirectional: parent ↔ child
		graph.get(parentName)!.add(currentTableName);
		graph.get(currentTableName)!.add(parentName);
	}

	// Process nested tables recursively
	if (table.nestedTables && table.nestedTables.length > 0) {
		table.nestedTables.forEach(nestedTable => {
			addNestedRelationships(graph, nestedTable, currentTableName);
		});
	}
}

/**
 * Builds a connection graph between nodes
 */
function buildConnectionGraph(nodes: Node<TableData>[], edges: Edge[]): Map<string, Set<string>> {
	const graph = new Map<string, Set<string>>();

	// Initialize all parent nodes in the graph and add nested relationships
	nodes.forEach(node => {
		addNestedRelationships(graph, node.data);
	});

	// Add unidirectional connections based on edges (only between parent nodes)
	edges.forEach(edge => {
		const sourceNode = nodes.find(n => n.id === edge.source);
		const targetNode = nodes.find(n => n.id === edge.target);

		if (sourceNode && targetNode) {
			const sourceName = sourceNode.data.label;
			const targetName = targetNode.data.label;

			if (!graph.has(sourceName)) graph.set(sourceName, new Set());
			if (!graph.has(targetName)) graph.set(targetName, new Set());

			// Unidirectional: source -> target only
			graph.get(sourceName)!.add(targetName);
		}
	});

	return graph;
}

/**
 * Verifies if there is a path between all tables mentioned in the query
 * using BFS (Breadth-First Search) - checks bidirectional paths
 */
function hasPathBetweenAllTables(collections: string[], graph: Map<string, Set<string>>): boolean {
	if (collections.length <= 1) return true;

	// Verify if all tables are in the graph
	for (const table of collections) {
		if (!graph.has(table)) return false;
	}

	// For each pair of tables, verify if there is a path in either direction
	for (let i = 0; i < collections.length; i++) {
		for (let j = i + 1; j < collections.length; j++) {
			const hasForwardPath = hasPathBFS(collections[i], collections[j], graph);
			const hasBackwardPath = hasPathBFS(collections[j], collections[i], graph);

			// If no path exists in either direction, the query cannot be handled
			if (!hasForwardPath && !hasBackwardPath) {
				return false;
			}
		}
	}

	return true;
}

/**
 * BFS to find path between two nodes
 */
function hasPathBFS(start: string, end: string, graph: Map<string, Set<string>>): boolean {
	if (start === end) return true;

	const visited = new Set<string>();
	const queue = [start];
	visited.add(start);

	while (queue.length > 0) {
		const current = queue.shift()!;
		const neighbors = graph.get(current);

		if (neighbors) {
			for (const neighbor of neighbors) {
				if (neighbor === end) return true;

				if (!visited.has(neighbor)) {
					visited.add(neighbor);
					queue.push(neighbor);
				}
			}
		}
	}

	return false;
}

/**
 * Verifies if a query is completely handled
 */
function isQueryFullyHandled(
	collections: string[],
	tableNames: Set<string>,
	graph: Map<string, Set<string>>
): boolean {
	// 1. Verify that all tables exist (including nested ones)
	const allTablesExist = collections.every(collection => tableNames.has(collection));
	if (!allTablesExist) return false;

	// 2. Verify that there is a path between all tables
	return hasPathBetweenAllTables(collections, graph);
}

/**
 * Counts the handled queries
 */
function getHandledQueriesCount(
	queries: Query[],
	tableNames: Set<string>,
	graph: Map<string, Set<string>>
): number {
	return queries.filter(query =>
		isQueryFullyHandled(query.collections, tableNames, graph)
	).length;
}

/**
 * Calculates the percentage of handled queries in an optimized way
 */
export function calculateHandledQueriesPercentage(
	queries: Query[],
	nodes: Node<TableData>[],
	edges: Edge[]
): number {
	// Generate hashes to detect changes
	const currentNodeHash = generateNodeHashWithoutPosition(nodes);
	const currentQueryHash = generateHash(queries);
	const currentEdgeHash = generateHash(edges);

	// If there are no relevant changes, return cached result
	if (
		cachedResult !== null &&
		lastNodeHash === currentNodeHash &&
		lastQueryHash === currentQueryHash &&
		lastEdgeHash === currentEdgeHash
	) {
		return cachedResult;
	}

	// Update hashes
	lastNodeHash = currentNodeHash;
	lastQueryHash = currentQueryHash;
	lastEdgeHash = currentEdgeHash;

	// Perform calculation
	const tableNames = getAllTableNames(nodes);
	const graph = buildConnectionGraph(nodes, edges);
	const totalQueries = queries.length;
	const handledQueries = getHandledQueriesCount(queries, tableNames, graph);

	if (totalQueries === 0) {
		cachedResult = 0;
		return 0;
	}

	const percentage = (handledQueries / totalQueries) * 100;
	cachedResult = Math.round(percentage * 100) / 100;

	return cachedResult;
}