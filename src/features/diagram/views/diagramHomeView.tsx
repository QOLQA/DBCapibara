import { useParams } from "react-router-dom";
import DatabaseDiagram from "../components/DatabaseDiagram";
interface Params {
	diagramId: string;
}

export default function DiagramHomeView() {
	const { diagramId } = useParams();

	return (
		<>
			<header>Header diagram home view</header>
			<main>Main diagram home view. Diagram id {diagramId}
        <div style={{ width: "100%", height: "600px" }}>
          <DatabaseDiagram />
        </div>
      </main>
			<footer>Footer diagram home view</footer>
		</>
	);
}
