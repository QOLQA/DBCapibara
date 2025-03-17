import { useParams } from "react-router-dom";

interface Params {
	diagramId: string;
}

export default function DiagramHomeView() {
	const { diagramId } = useParams();

	return (
		<>
			<header>Header diagram home view</header>
			<main>Main diagram home view. Diagram id {diagramId}</main>
			<footer>Footer diagram home view</footer>
		</>
	);
}
