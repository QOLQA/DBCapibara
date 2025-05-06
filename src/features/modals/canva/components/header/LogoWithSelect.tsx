import { Logo } from "@/components/icons/header";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { VersionOption } from "./types";
import { useState } from "react";

// components/header/LogoWithSelect.tsx
export const LogoWithSelect = ({ Versions }: { Versions: VersionOption[] }) => {
	const [selectedVersion, setSelectedVersion] = useState(
		Versions[Versions.length - 1].value, // selecciona el último por defecto
	);
	return (
		<div className="flex items-center gap-8">
			<Logo className="text-blue" />
			<Select value={selectedVersion} onValueChange={setSelectedVersion}>
				<SelectTrigger className="border-gray rounded-full !text-white text-h6 w-[153px] py-[7px] px-[20px]">
					<SelectValue />
				</SelectTrigger>
				<SelectContent className="!text-white bg-secondary-gray border-gray p-[10px] w-[240px]">
					{Versions.map((version) => (
						<SelectItem
							key={version.value}
							value={version.value}
							className="border-b-[1px] text-h6 rounded-none !border-cuartenary-gray hover:!bg-gray hover:!text-white focus:!bg-gray focus:!text-white rounded-md"
						>
							{version.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
