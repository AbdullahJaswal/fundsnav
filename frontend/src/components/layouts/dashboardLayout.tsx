import StandardNavbar from "@/components/navbars/standardNavbar";
import StandardFooter from "@/components/footers/standardFooter";
import DashboardSidebar from "@/components/sidebars/dashboardSidebar";
import { ReactNode } from "react";
import ErrorBoundary from "../errorBoundary";
import GlobalModals from "../modals/globalModals";
import DashboardModals from "../modals/dashboardModals";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <section className="flex flex-col mx-auto justify-between min-h-screen">
      <StandardNavbar />

      <div className="drawer lg:drawer-open mb-auto overflow-hidden">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col gap-4 p-4 md:px-6 w-full lg:border-l border-base-300 overflow-auto">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>

        <div className="drawer-side min-h-full lg:max-h-[calc(100vh-114px)] pt-[65px] lg:pt-0">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

          <DashboardSidebar />
        </div>
      </div>

      <StandardFooter />

      <DashboardModals />
      <GlobalModals />
    </section>
  );
}
