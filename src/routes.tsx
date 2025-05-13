import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Ruta principal
  index("./features/home/HomeView.tsx"),

  // Vista general de los modals
  route("models", "./features/modals/views/ModalsView.tsx"),

  // Vista del diagrama reactflow
  route("models/:diagramId/canva", "./features/modals/canva/DiagramView.tsx"),

  // Vista de análisis específica
  route(
    "models/:diagramId/analysis",
    "./features/modals/analysis/AnalysisView.tsx"
  ),
] satisfies RouteConfig;
