import StandardNavbar from "@/components/navbars/standardNavbar";
import StandardFooter from "@/components/footers/standardFooter";
import { ReactNode } from "react";
import ErrorBoundary from "@/components/errorBoundary";
import GlobalModals from "../modals/globalModals";
import StandardModals from "../modals/standardModals";

type Props = {
  children: ReactNode;
};

export default function StandardLayout({ children }: Props) {
  return (
    <section className="flex flex-col mx-auto justify-between min-h-screen">
      <StandardNavbar />

      <main className="max-w-7xl mx-auto flex flex-col gap-4 mb-auto w-full overflow-y-auto p-4">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>

      <StandardFooter />

      <StandardModals />
      <GlobalModals />
    </section>
  );
}
