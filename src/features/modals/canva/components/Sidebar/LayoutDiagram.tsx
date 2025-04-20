import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/modals/canva/components/Sidebar/AppSidebar";

export function LayoutDiagram({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />

			<SidebarTrigger className="" />
			<SidebarInset>
				<main className="h-full w-full overflow-hidden">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
