import { isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/DiagramView";

import { transformSolutionModel } from "@/lib/solutionConversion";
import { useCanvasStore } from "@/state/canvaStore";

import DatabaseDiagram from "./components/DataBaseDiagram";
import { LayoutDiagram } from "./LayoutDiagram";
import { useEffect } from "react";
import type { VersionFrontend } from "./types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function loader({ params }: Route.LoaderArgs) {
	const { diagramId } = params;

	const url = `${backendUrl}/solutions/${diagramId}`;

	if (import.meta.env.MODE !== "production") {
		console.log("URL", url);
	}

	const response = await fetch(url, { method: "GET" });
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.detail);
	}

	const transformed = transformSolutionModel(data);
	return transformed;
}

// Placeholder for future action functionality. This function is intentionally left empty.
export async function action() {}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	if (isRouteErrorResponse(error)) {
		return (
			<>
				<h1>
					{error.status} {error.statusText}
				</h1>
				<p>{error.data}</p>
			</>
		);
	}
	if (error instanceof Error) {
		return (
			<div>
				<h1>Error</h1>
				<p>{error.message}</p>
				<p>The stack trace is:</p>
				<pre>{error.stack}</pre>
			</div>
		);
	}
	return <h1>Unknown Error</h1>;
}

export default function DiagramView({ loaderData }: Route.ComponentProps) {
	const {
		id,
		setNodes,
		setEdges,
		setQueries,
		setId,
		setVersions,
		setSelectedVersionId,
		_hasHydrated,
	} = useCanvasStore.getState();

	const versionId = loaderData.versions.findIndex(
		(version: VersionFrontend) => loaderData.last_version_saved === version._id,
	);

	useEffect(() => {
		if (_hasHydrated) {
			if (id !== loaderData.solutionId) {
				setId(loaderData.solutionId);
				setNodes(loaderData.versions[versionId].nodes);
				setEdges(loaderData.versions[versionId].edges);
				setQueries(loaderData.versions[versionId].queries);
				setVersions(loaderData.versions);
				setSelectedVersionId(loaderData.versions[versionId]._id);
			}
		}
	}, [
		_hasHydrated,
		loaderData,
		versionId,
		setEdges,
		setId,
		setNodes,
		setQueries,
		setVersions,
		setSelectedVersionId,
		id,
	]);

	if (!_hasHydrated) {
		return null;
	}
	return (
		<>
			<LayoutDiagram title={loaderData.name}>
				<DatabaseDiagram />
			</LayoutDiagram>
		</>
	);
}
