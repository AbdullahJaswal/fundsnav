import { Fund, MarketCap } from "@/common/types/mutual_funds/mutualFunds";
import ChartCard from "@/components/charts/chartCard";
import DashboardHeader from "@/components/headers/dashboardHeader";
import Stat from "@/components/stats/stat";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import getFund from "@/pages/api/mutual-funds/fund/[slug]/getFund";
import getAllMarketCaps from "@/pages/api/mutual-funds/fund/[slug]/market-caps/getAllMarketCaps";
import moment from "moment";
import { GetServerSidePropsContext } from "next";
import { Session, getServerSession } from "next-auth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import SpinnerLoader from "@/components/loaders/spinnerLoader";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import Head from "next/head";

const LineChart = dynamic(() => import("@/components/charts/line/lineChart"), {
  ssr: false,
  loading: () => <SpinnerLoader />,
});
const CalendarChart = dynamic(() => import("@/components/charts/calendar/calendarChart"), {
  ssr: false,
  loading: () => <SpinnerLoader />,
});

type Props = {
  fund: Fund;
  market_caps: MarketCap[];
};

export default function FundDetail(props: Props) {
  const pathname = usePathname();
  const [interval, setInterval] = useState("1m");
  const [highPrecision, setHighPrecision] = useState(false);
  const [lastUpdatedOn, setLastUpdatedOn] = useState("");
  const [marketCapDate, setMarketCapDate] = useState("");

  const { data, isLoading, error } = useSWR(
    `/api/mutual-funds/fund/${props.fund.slug}/nav/chart/?interval=${interval}&high_precision=${highPrecision}`,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const market_cap_diff_perc =
    props.market_caps?.[0]?.total && props.market_caps?.[1]?.total
      ? ((props.market_caps?.[0]?.total - props.market_caps?.[1]?.total) / props.market_caps?.[1]?.total) * 100
      : null;

  useEffect(() => {
    if (props.fund.last_updated_on) {
      setLastUpdatedOn(moment(props.fund.last_updated_on).startOf("day").fromNow());
    }
  }, [props.fund.last_updated_on]);

  useEffect(() => {
    if (props.market_caps?.[0]?.month) {
      setMarketCapDate(moment(props.market_caps?.[0]?.month).format("MMMM YYYY"));
    }
  }, [props.market_caps]);

  const calendar_data = data?.map((item: any) => {
    return {
      day: item.x,
      value: item.y,
    };
  });

  return (
    <>
      <Head>
        <title>{props?.fund?.name} - FundsNav</title>
        <meta
          name="description"
          content="FundsNav is a platform that helps you track your mutual fund investments and provides you with insights to help you make better investment decisions."
        />
        <meta
          name="keywords"
          content="mutual funds, mutual fund, mutual fund investments, mutual fund investment, mutual fund returns, mutual fund investment returns, mutual fund investment returns calculator, mutual fund investment returns calculator india, mutual fund investment returns calculator excel, mutual fund investment returns calculator excel india, mutual fund investment returns calculator excel sheet, mutual fund investment returns calculator excel sheet india, mutual fund investment returns calculator excel sheet download, mutual fund investment returns calculator excel sheet free download, mutual fund investment returns calculator excel sheet with sip, mutual fund investment returns calculator excel sheet with sip india, mutual fund investment returns calculator excel sheet with sip download, mutual fund investment returns calculator excel sheet with sip free download"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DashboardHeader
        title={props.fund.name}
        subtitle="View and analyze the top performing funds."
        showBreadcrumbs={true}
        showLinks={false}
        appendPages={[
          {
            name: `Fund: ${props.fund.name}`,
            href: pathname,
          },
        ]}
      />

      <div className="grid gap-4 grid-cols-1">
        <Stat title="Market Cap" value={props.market_caps?.[0].total} value_decimals={0} subtitle={marketCapDate} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Net Asset Value (NAV)"
          color="primary-gradient"
          subtitle={`last updated ${lastUpdatedOn}`}
          Chart={LineChart}
          data={[{ id: props.fund.name, color: props.fund.amc?.color, data: data }]}
          isDataLoaded={!isLoading}
          range={interval}
          setRange={setInterval}
          maxDate={new Date()}
          error={error}
          highPrecision={highPrecision}
          setHighPrecision={setHighPrecision}
        />

        <ChartCard
          title="NAV Calendar"
          subtitle={`last updated ${lastUpdatedOn}`}
          Chart={CalendarChart}
          data={calendar_data}
          isDataLoaded={!isLoading}
          error={error}
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  const session: Session | null = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const slug = typeof context.query.slug === "string" ? context.query.slug : "";

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const [fund, market_caps] = await Promise.all([
    getFund(session?.access!, slug),
    getAllMarketCaps(session?.access!, slug),
  ]);

  return {
    props: {
      fund: fund,
      market_caps: market_caps.results,
    },
  };
}
