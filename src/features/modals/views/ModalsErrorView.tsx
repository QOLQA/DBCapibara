import { useRouteError } from "react-router-dom";

const ModalsErrorView = () => {
	const error = useRouteError();

	let errorMessage = "Ocurrió un error inesperado.";
	if (error instanceof Error) {
		errorMessage = error.message;
	} else if (typeof error === "string") {
		errorMessage = error;
	}

	return (
		<div>
			<h1>Error al cargar los diagrama</h1>
			<p>{errorMessage}</p>
		</div>
	);
};

export default ModalsErrorView;
