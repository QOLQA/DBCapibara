import DatabaseDiagram from "./components/DataBaseDiagram";
import { LayoutDiagram } from "./components/LayoutDiagram";

import type { Edge } from "@xyflow/react";
import type { Route } from "./+types/DiagramView";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function loader({ params }: Route.LoaderArgs) {
	const url = `${backendUrl}/solutions/${params.diagramId}`;

	console.log("URL", url);
	const response = await fetch(url, {
		method: "GET",
	});
	const data = await response.json();
	if (response.status === 400 || response.status === 404) {
		throw new Error(data.detail);
	}
	return data;
}

export async function action() {}

export default function DiagramView({ loaderData }: Route.ComponentProps) {
	const initialEdges: Edge[] = [
		{ id: "edge1", source: "table1", target: "table2", type: "smoothstep" },
	];

	return (
		<>
			<LayoutDiagram>
				<DatabaseDiagram
					initialNodes={loaderData.submodels}
					initialEdges={initialEdges}
				/>
			</LayoutDiagram>
		</>
	);
}
