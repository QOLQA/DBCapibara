import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	// Ruta principal
	index("./features/home/homeView.tsx"),

	// Vista general de los modals
	route("modals", "./features/modals/views/modalsView.tsx"),

	// Vista del diagrama reactflow
	route("modals/:diagramId/canva", "./features/modals/canva/DiagramView.tsx"),

	// Vista de análisis específica
	route(
		"modals/:diagramId/analysis",
		"./features/modals/analysis/AnalysisView.tsx",
	),
] satisfies RouteConfig;
