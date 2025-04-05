import { Outlet } from "react-router-dom";

export default function UserHomeView() {
	return (
		<>
			<header>Header user home view</header>
			<main>
				<h1>Here is the content for pages inside user</h1>
				<Outlet />
			</main>
			<footer>Footer user home view</footer>
		</>
	);
}
