import type { VersionBackend } from "@/features/modals/canva/types";

const backendUrl = "http://localhost:8000";

export const saveCanvas = async (
	diagramId: string,
	versionId: string,
	diagram: VersionBackend,
) => {
	const diagramJson = JSON.stringify(diagram, null, 2);

	const url = `${backendUrl}/solutions/${diagramId}/versions/${versionId}`;
	console.log("Saving diagram to URL:", url);
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
};
