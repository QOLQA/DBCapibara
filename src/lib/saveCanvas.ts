import { useCanvasStore } from "@/state/canvaStore";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const saveCanvas = async (diagramId: string) => {
  const url = `${backendUrl}/solutions/${diagramId}`;
  const json = useCanvasStore.getState().exportToJson();
  await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: json,
  });
};