import { Save } from "@/components/icons/HeaderIcons";
import { Button } from "@/components/ui/button";
import { transformVersionToBackend } from "@/lib/canvaConversion";
import { saveCanvas } from "@/lib/saveCanvas";
import { useCanvasStore } from "@/state/canvaStore";

export const ButtonSave = () => {
	const Id = useCanvasStore((state) => state.id);
	const versionId = useCanvasStore((state) => state.selectedVersionId);
	const versions = useCanvasStore((state) => state.versions);
	const nodes = useCanvasStore((state) => state.nodes);
	const edges = useCanvasStore((state) => state.edges);
	const queries = useCanvasStore((state) => state.queries);

	const handleSave = () => {
		const versionActual = versions.filter(
			(version) => version._id === versionId,
		);
		const diagram = transformVersionToBackend(
			versionActual[0],
			nodes,
			edges,
			queries,
		);

		saveCanvas(Id, versionId, diagram);
	};

	return (
		<Button className="group cursor-pointer" onClick={handleSave}>
			<Save className="text-lighter-gray cursor-pointer group-hover:text-white group-hover:ease-in-out group-hover:duration-300" />
		</Button>
	);
};
