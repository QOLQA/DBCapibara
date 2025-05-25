const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function loaderCanva(diagramId: string) {
	const url = `${backendUrl}/solutions/${diagramId}`;
	const response = await fetch(url, {
		method: "GET",
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.detail);
	}
	return data;
}
