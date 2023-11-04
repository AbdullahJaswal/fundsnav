import "@/styles/globals.css";

import type { AppProps } from "next/app";
import StandardLayout from "@/components/layouts/standardLayout";
import React, { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { SessionProvider, getSession } from "next-auth/react";

import { Comfortaa as Font } from "next/font/google";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import DashboardLayout from "@/components/layouts/dashboardLayout";

const font = Font({
  subsets: ["latin"],
  preload: true,
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session;
  pageProps: any;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default function App({ Component, session, pageProps }: AppPropsWithLayout) {
  const renderWithLayout =
    Component.getLayout ||
    function (page: ReactElement) {
      return (
        <section className={font.className}>
          <SessionProvider session={session}>
            <StandardLayout>{page}</StandardLayout>
          </SessionProvider>
        </section>
      );
    };

  const pathname = usePathname();

  if (pathname && pathname.startsWith("/dashboard")) {
    return (
      <section className={font.className}>
        <SessionProvider session={session}>
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        </SessionProvider>
      </section>
    );
  }

  return (
    <section className={font.className}>
      <SessionProvider session={session}>{renderWithLayout(<Component {...pageProps} />)}</SessionProvider>
    </section>
  );
}

App.getInitialProps = async (context: any) => {
  const { ctx } = context;
  const session = await getSession(ctx);

  return {
    session,
  };
};
