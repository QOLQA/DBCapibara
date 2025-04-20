import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";
import type { Data, NavItem } from "./types";

type SidebarIconsProps = {
	data: Data;
	activeItem: NavItem;
	setActiveItem: (item: NavItem) => void;
	setOpen: (open: boolean) => void;
};

const databaseItem = "Database";

export const SidebarIcons = ({
	data,
	setActiveItem,
	setOpen,
	activeItem,
}: SidebarIconsProps) => {
	return (
		<Sidebar
			collapsible="none"
			className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
		>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent className="px-1.5 md:px-0">
						<SidebarMenu>
							{data.navMain.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										tooltip={{
											children: item.title,
											hidden: false,
										}}
										onClick={() => {
											if (item.title !== databaseItem) {
												setActiveItem(item);
												setOpen(true);
											} else {
												setOpen(false);
												setActiveItem(item);
											}
										}}
										isActive={activeItem?.title === item.title}
										className="px-2.5 md:px-2"
									>
										{item.icon && item.icon}
										<span>{item.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
};
