import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="h-screen w-screen overflow-hidden">
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}
