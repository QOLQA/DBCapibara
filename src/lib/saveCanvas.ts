import type { VersionBackend } from "@/features/modals/canva/types";
import { loadCanva } from "./loadCanva";

const backendUrl = "http://localhost:8000";

export const saveCanvas = async (
	diagramId: string,
	versionId: string,
	diagram: VersionBackend,
) => {
	const diagramJson = JSON.stringify(diagram, null, 2);

	const url = `${backendUrl}/solutions/${diagramId}/versions/${versionId}`;

	try {
		await fetch(url, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: diagramJson,
		});
	} catch (error) {
		console.error("Error saving canvas:", error);
		throw new Error("Failed to save canvas");
	}

	loadCanva(diagramId, versionId);
};
