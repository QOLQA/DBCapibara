import DatabaseDiagram from "../components/DatabaseDiagram";
import { useLoaderData } from "react-router-dom";

export default function DiagramHomeView() {
	const data = useLoaderData();

	return (
		<>
			<header>Header diagram home view</header>
			<main>
				<h1>Main diagram home view</h1>
				<div style={{ width: "100%", height: "600px" }}>
					<DatabaseDiagram nodes={data.submodels} />
				</div>
			</main>
			<footer>Footer diagram home view</footer>
			<h2>Nombre del modelo: {data.name}</h2>
		</>
	);
}
