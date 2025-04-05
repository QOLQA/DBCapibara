// import DatabaseDiagram from "../components/ToEliminate";
import { useLoaderData } from "react-router-dom";
import DatabaseDiagram from "../components/DataBaseDiagram";
import { Layout } from "@/components/Layout";
import type { Edge } from "@xyflow/react";

export default function DiagramHomeView() {
	const data = useLoaderData();
	const initialEdges: Edge[] = [
		{ id: "edge1", source: "table1", target: "table2", type: "smoothstep" },
	];

	return (
		<>
			<Layout>
				<DatabaseDiagram
					initialNodes={data.submodels}
					initialEdges={initialEdges}
				/>
			</Layout>
		</>
	);
}
