import { useRouteError } from "react-router-dom";

export default function DiagramErrorView() {
	const error = useRouteError();

	let errorMessage = "Ocurrió un error inesperado.";
	if (error instanceof Error) {
		errorMessage = error.message;
	} else if (typeof error === "string") {
		errorMessage = error;
	}

	return (
		<div>
			<h1>Error al cargar el diagrama</h1>
			<p>{errorMessage}</p>
		</div>
	);
}
