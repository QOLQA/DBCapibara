import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./features/home/homeView";
import UserHomeView from "./features/user/views/userHomeView";
import DiagramHomeView from "./features/diagram/views/diagramHomeView";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<HomeView />} />
				<Route path="user">
					<Route index element={<UserHomeView />} />
					<Route path="diagram/:diagramId" element={<DiagramHomeView />} />
				</Route>
				<Route path="*" element={<p>Not found</p>} />
			</Routes>
		</BrowserRouter>
	);
}
