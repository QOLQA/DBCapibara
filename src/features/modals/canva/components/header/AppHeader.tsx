import {
	ArrowLeft,
	ArrowRight,
	Chevron,
	Save,
} from "@/components/icons/HeaderIcons";

import { LogoWithSelect } from "./LogoWithSelect";
import type { VersionOption } from "./types";

const Versions: VersionOption[] = [
	{ value: "version1", label: "Versión 1" },
	{ value: "version2", label: "Versión 2" },
];

export const AppHeader = ({ title }: { title: string }) => {
	return (
		<header className="flex flex-row items-center justify-between w-full h-16 bg-secondary-gray p-4 text-white">
			<LogoWithSelect Versions={Versions} />
			<div className="flex items-center gap-8 mr-30">
				<div className="flex items-center gap-4">
					<ArrowLeft className="text-white" />
					<ArrowRight className="text-lighter-gray" />
				</div>
				<div className="flex items-center gap-3">
					<h1 className="text-h4 text-white">{title}</h1>
					<Chevron className="text-white" />
				</div>
			</div>
			<div>
				<Save className="text-lighter-gray" />
			</div>
		</header>
	);
};
