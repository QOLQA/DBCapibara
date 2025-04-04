import { Link } from "react-router-dom";

export default function HomeView() {
	return (
		<>
			<header>Header home view</header>
			<main>
				Main home view
				<Link to="/user/diagram/123">Ir al Diagrama</Link>
			</main>
			<footer>Footer home view</footer>
		</>
	);
}
