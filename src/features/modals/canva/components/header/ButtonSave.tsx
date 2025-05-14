import { Save } from "@/components/icons/HeaderIcons";
import { saveCanvas } from "@/lib/saveCanvas";

export const ButtonSave = () => {
	return (
		<button
			type="button"
			className="group"
			onClick={() => saveCanvas("diagramId")}
		>
			<Save className="text-lighter-gray cursor-pointer group-hover:text-white group-hover:ease-in-out group-hover:duration-300" />
		</button>
	);
};
