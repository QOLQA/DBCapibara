import DatabaseDiagram from "./components/DataBaseDiagram";
import { LayoutDiagram } from "./LayoutDiagram";

import { isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/DiagramView";
import { transformSolutionModel } from "@/lib/solutionConversion";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function loader({ params }: Route.LoaderArgs) {
  const url = `${backendUrl}/solutions/${params.diagramId}`;

  if (import.meta.env.MODE !== "production") {
    console.log("URL", url);
  }
  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail);
  }
  return transformSolutionModel(data);
}

// Placeholder for future action functionality. This function is intentionally left empty.
export async function action() {}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  }
  if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }
  return <h1>Unknown Error</h1>;
}

export default function DiagramView({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <LayoutDiagram title={loaderData.name}>
        <DatabaseDiagram
          initialNodes={loaderData.initialNodes}
          initialEdges={loaderData.initialEdges}
        />
      </LayoutDiagram>
    </>
  );
}
