import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/modals/canva/components/Sidebar/AppSidebar";

export function LayoutDiagram({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider defaultOpen={false}>
			<AppSidebar />

			<SidebarInset>
				<main className="h-full w-full overflow-hidden">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
