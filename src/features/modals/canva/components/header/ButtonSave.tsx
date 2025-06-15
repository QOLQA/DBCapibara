import { Save } from "@/components/icons/HeaderIcons";
import { transformVersionToBackend } from "@/lib/canvaConversion";
import { saveCanvas, saveSolution } from "@/lib/saveCanvas";
import { useCanvasStore } from "@/state/canvaStore";
import { getNodesBounds, getViewportForBounds } from "@xyflow/react";
import { toPng, toSvg } from "html-to-image";

const imageWidth = 1024;
const imageHeight = 768;

function downloadImage(dataUrl: string) {
  const a = document.createElement('a');
 
  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

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
		);

		saveSolution(Id, queries);
		saveCanvas(Id, versionId, diagram);

		generateImage()
	};

	const generateImage = () => {
		const nodesBounds = getNodesBounds(nodes)
		const viewport = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2)

		toSvg(document.querySelector('.react-flow__viewport') as HTMLElement, {
			backgroundColor: '#171717',
			width: imageWidth,
			height: imageHeight,
			style: {
				width: imageWidth,
				height: imageHeight,
				transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`
			},
			skipFonts: true
		}).then(downloadImage)
	}

	return (
		<button type="button" className="group cursor-pointer" onClick={handleSave}>
			<Save className="text-lighter-gray cursor-pointer group-hover:text-white group-hover:ease-in-out group-hover:duration-300" />
		</button>
	);
};
