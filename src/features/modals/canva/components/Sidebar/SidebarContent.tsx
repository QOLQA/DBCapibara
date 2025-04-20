import {
	Sidebar,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
} from "@/components/ui/sidebar";
import type { Data, NavItem } from "./types";

type SidebarContentPrincProps = {
	activeItem: NavItem;
	data: Data;
};

export const SidebarContentPrinc = ({
	activeItem,
	data,
}: SidebarContentPrincProps) => {
	return (
		<Sidebar collapsible="none" className="hidden flex-1 md:flex">
			<SidebarHeader className="gap-3.5 border-b p-4">
				<div className="flex w-full items-center justify-center">
					<div className="text-base font-medium text-foreground">
						{activeItem?.title}
					</div>
				</div>
			</SidebarHeader>
			<SidebarGroupContent>
				<SidebarGroup className="px-0">
					<SidebarGroupContent>
						<div className="flex flex-col gap-2 px-2 py-4">
							{/* {data.items.map((item) => (
								<div
									key={item.title}
									className="flex items-center gap-2 rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
								>
									<item.icon className="size-4" />
									<span>{item.title}</span>
								</div>
							))} */}
							Contenido del texto
						</div>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarGroupContent>
		</Sidebar>
	);
};
