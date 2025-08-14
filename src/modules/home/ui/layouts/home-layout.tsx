import { SidebarProvider } from "@/components/ui/sidebar";
import { Homenavbar } from "../components/home-navbar";
import { HomeSideBar } from "../components/home-sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <Homenavbar />
        <div className="flex min-h-screen pt-[4rem]">
          <HomeSideBar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
