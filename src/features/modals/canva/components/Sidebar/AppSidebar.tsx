import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import {
	Calendar,
	Database,
	DataPie,
} from "../../../../../components/icons/sidebar";
import { SidebarIcons } from "./SidebarIcons";
import { useState } from "react";
import { SidebarContentPrinc } from "./SidebarContent";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "./icons/avatar.png",
	},
	navMain: [
		{
			title: "Database",
			icon: <Database />,
			isActive: true,
		},
		{
			title: "Consultas",
			icon: <Calendar />,
		},
		{
			title: "Estadísticas",
			icon: <DataPie />,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [activeItem, setActiveItem] = useState(data.navMain[0]);
	const { setOpen } = useSidebar();
	return (
		<Sidebar
			collapsible="icon"
			className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
			{...props}
		>
			<SidebarIcons
				data={data}
				activeItem={activeItem}
				setActiveItem={setActiveItem}
				setOpen={setOpen}
			/>
			<SidebarContentPrinc activeItem={activeItem} data={data} />
		</Sidebar>
	);
}
