import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeView from "./features/home/homeView";
import UserHomeView from "./features/user/views/userHomeView";
import DiagramHomeView from "./features/diagram/views/diagramHomeView";
import DiagramErrorView from "./features/diagram/views/DiagramErrorView";

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
				errorElement: <DiagramErrorView />,
				Component: DiagramHomeView,
				loader: async ({ request, params }) => {
					const response = await fetch(
						`http://localhost:8000/solutions/${params.diagramId}`,
						{
							signal: request.signal,
						},
					);
					const data = await response.json();
					if (response.status === 400 || response.status === 404) {
						throw new Error(data.detail);
					}
					return data;
				},
				// La excepcion que puede lanzar el loader debe mostrarse en el componente
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
