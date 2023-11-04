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
import { useState } from "react";

import dynamic from "next/dynamic";
import SpinnerLoader from "@/components/loaders/spinnerLoader";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
const LineChart = dynamic(() => import("@/components/charts/line/lineChart"), {
  ssr: false,
  loading: () => <SpinnerLoader />
});

type Props = {
  fund: Fund;
  market_caps: MarketCap[];
}

export default function FundDetail(props: Props) {
  const pathname = usePathname();
  const [interval, setInterval] = useState('1m');

  const { data, isLoading, error } = useSWR(
    `/api/mutual-funds/fund/${props.fund.slug}/nav/chart/?interval=${interval}`,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const market_cap_diff_perc = props.market_caps?.[0]?.total && props.market_caps?.[1]?.total ? (
    ((props.market_caps?.[0]?.total - props.market_caps?.[1]?.total) / props.market_caps?.[1]?.total) * 100
  ) : null;

  return (
    <>
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

      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        <Stat
          title="Market Cap"
          value={props.market_caps?.[0].total}
          value_decimals={0}
          subtitle={moment(props.market_caps?.[0].month).format('MMMM YYYY')}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartCard
          title="Net Asset Value (NAV)"
          color="primary-gradient"
          subtitle={`last updated ${moment(props.fund.last_updated_on).startOf('day').fromNow()}`}
          Chart={LineChart}
          data={[{ id: props.fund.name, color: props.fund.amc?.color, data: data }]}
          isDataLoaded={!isLoading}
          range={interval}
          setRange={setInterval}
          maxDate={new Date()}
          error={error}
        />
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const session: Session | null = await getServerSession(context.req, context.res, authOptions);

  const slug = typeof context.query.slug === 'string' ? context.query.slug : "";

  if (!slug) {
    return {
      notFound: true,
    }
  }

  const [fund, market_caps] = await Promise.all([
    getFund(session?.access!, slug),
    getAllMarketCaps(session?.access!, slug),
  ])

  return {
    props: {
      fund: fund,
      market_caps: market_caps.results,
    },
  }
}
