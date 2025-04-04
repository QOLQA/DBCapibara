import { useParams } from "react-router-dom";
import DatabaseDiagram from "../components/DataBaseDiagram";
import { Layout } from "@/components/Layout";

export default function DiagramHomeView() {
	const { diagramId } = useParams();

	return (
		<>
			<Layout>
				<header>Main diagram home view. Diagram id {diagramId}</header>
				<DatabaseDiagram />
			</Layout>
		</>
	);
}
