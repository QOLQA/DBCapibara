import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeView from "./features/home/homeView";
import UserHomeView from "./features/user/views/userHomeView";
import DiagramHomeView from "./features/diagram/views/diagramHomeView";

const router = createBrowserRouter([
	{
		path: "/",
		Component: HomeView,
	},
	{
		path: "/user",
		Component: UserHomeView,
		children: [
			{
				path: "diagram/:diagramId",
				Component: DiagramHomeView,
				loader: async ({ request, params }) => {
					const response = await fetch(
						`http://localhost:8000/solutions/${params.diagramId}`,
						{
							signal: request.signal,
						},
					);
					return await response.json();
				},
			},
			{
				path: "*",
				element: <h1>No existe esta vista para el usuario</h1>,
			},
		],
	},
	{
		path: "*",
		element: <h1>Page not found</h1>,
	},
]);

export default function Router() {
	return <RouterProvider router={router} />;
}
