import { Logo } from "@/components/icons/HeaderIcons";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { canvaSelector, useCanvasStore } from "@/state/canvaStore";
import { useShallow } from "zustand/shallow";

// components/header/LogoWithSelect.tsx
export const LogoWithSelect = () => {
	const {
		versions: Versions,
		selectedVersionId,
		setSelectedVersionId,
		setNodes,
		setEdges,
		setQueries,
	} = useCanvasStore<ReturnType<typeof canvaSelector>>(
		useShallow(canvaSelector)
	);

	const onVersionChange = (newVersionId: string) => {
		const versionIndex = Versions.findIndex(
			(version) => version._id === newVersionId
		);
		setNodes(Versions[versionIndex].nodes);
		setEdges(Versions[versionIndex].edges);
		setQueries(Versions[versionIndex].queries);
		setSelectedVersionId(newVersionId);
	};

	return (
		<div className="flex items-center gap-8">
			<Logo className="text-blue" />
			<Select value={selectedVersionId} onValueChange={onVersionChange}>
				<SelectTrigger className="border-gray rounded-full !text-white text-h6 w-[153px] py-[7px] px-[20px]">
					<SelectValue />
				</SelectTrigger>
				<SelectContent className="!text-white bg-secondary-gray border-gray p-[10px] w-[240px]">
					{Versions.map((version) => (
						<SelectItem
							key={version._id}
							value={version._id}
							className="border-b-[1px] text-h6 !border-cuartenary-gray hover:!bg-gray hover:!text-white focus:!bg-gray focus:!text-white rounded-md"
						>
							{version.description}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
