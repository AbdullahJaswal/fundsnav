import { APIResponse } from "@/common/types/APIResponse";
import { Fund, FundsDistribution, FundsGrowth } from "@/common/types/mutual_funds/mutualFunds";
import DashboardHeader from "@/components/headers/dashboardHeader";
import SpinnerLoader from "@/components/loaders/spinnerLoader";
import FundsTable from "@/components/tables/fundsTable";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import getFundsDistribution from "@/pages/api/mutual-funds/analysis/getFundsDistribution";
import getFundsGrowth from "@/pages/api/mutual-funds/analysis/getFundsGrowth";
import getAllFunds from "@/pages/api/mutual-funds/fund/getAllFunds";
import { GetServerSidePropsContext } from "next";
import { Session, getServerSession } from "next-auth";
import colors from "tailwindcss/colors";

import dynamic from "next/dynamic";
const PieChart = dynamic(() => import("@/components/charts/pie/pieChart"), {
  ssr: false,
  loading: () => <SpinnerLoader />,
});
import { light_theme_colors, dark_theme_colors } from "@/components/charts/chartTheme";
import ChartCard from "@/components/charts/chartCard";
import BarChart from "@/components/charts/bar/barChart";
import Head from "next/head";

type Props = {
  funds: APIResponse<Fund>;
  funds_distribution: FundsDistribution;
  funds_growth: FundsGrowth;
};

const fundTypeColors: { [key: string]: string } = {
  "Open End Schemes": colors.green[500],
  "Closed End Schemes": colors.blue[500],
  "Exchange Traded Fund (ETF)": colors.orange[500],
  "Dedicated Equity Funds": colors.red[500],
  "Voluntary Pension Funds": colors.purple[500],
};

export default function FundLookup(props: Props) {
  const category_distribution = [
    ...Object.entries(props.funds_distribution.category_distribution).map(([key, value]) => {
      return {
        id: key,
        label: key,
        value: value,
        color: key === "Islamic" ? light_theme_colors.primary : dark_theme_colors.secondary,
      };
    }),
  ];

  const fund_type_distribution = [
    ...Object.entries(props.funds_distribution.fund_type_distribution).map(([key, value]) => {
      return {
        id: key,
        label: key,
        value: value,
        color: fundTypeColors[key],
      };
    }),
  ];

  const amc_distribution = [
    ...Object.entries(props.funds_distribution.amc_distribution).map(([key, value]) => {
      return {
        id: key,
        label: key,
        value: value.count,
        color: value.color,
      };
    }),
  ];

  const funds_growth = [
    ...Object.entries(props.funds_growth)
      .slice(0, 15)
      .map(([key, value]) => {
        return {
          fund: key,
          value: value.growth,
          color: value.color,
        };
      }),
    ...Object.entries(props.funds_growth)
      .slice(-15)
      .map(([key, value]) => {
        return {
          fund: key,
          value: value.growth,
          color: value.color,
        };
      }),
  ];

  return (
    <>
      <Head>
        <title>Mutual Funds - FundsNav</title>
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
        title="Mutual Funds"
        subtitle="View mutual funds of Pakistan and analyse their performance."
        showBreadcrumbs={true}
        showLinks={false}
      />

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <ChartCard title="Funds Allocation" Chart={PieChart} data={category_distribution} isDataLoaded={true} />

          <ChartCard title="Funds Distribution" Chart={PieChart} data={fund_type_distribution} isDataLoaded={true} />

          <ChartCard
            title="Asset Management Company Distribution"
            Chart={PieChart}
            data={amc_distribution}
            isDataLoaded={true}
          />

          <div className="md:col-span-3">
            <ChartCard title="Funds Growth" Chart={BarChart} data={funds_growth} isDataLoaded={true} />
          </div>
        </div>

        <div className="divider my-0" />

        <h2 className="text-2xl font-bold text-center lg:text-start text-gradient-primary">Funds Lookup</h2>

        {props.funds.count > 0 ? (
          <FundsTable funds={props.funds} />
        ) : (
          <div className="text-center text-muted flex h-[20vh]">
            <span className="m-auto">No results found.</span>
          </div>
        )}
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

  const [funds, funds_distribution, funds_growth] = await Promise.all([
    getAllFunds(session?.access!, "", 1, 1000),
    getFundsDistribution(session?.access!),
    getFundsGrowth(session?.access!),
  ]);

  return {
    props: {
      funds: funds,
      funds_distribution: funds_distribution,
      funds_growth: funds_growth,
    },
  };
}
