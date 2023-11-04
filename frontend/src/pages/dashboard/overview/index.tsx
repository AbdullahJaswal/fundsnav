import NewsCard from "@/components/cards/newsCard";
import news from "@/components/cards/newsSampleData";
import { boxplot_data } from "@/components/charts/boxplot/boxPlotChartSampleData";
import ChartCard from "@/components/charts/chartCard";
import { linechart_data } from "@/components/charts/line/lineChartSampleData";
import DashboardHeader from "@/components/headers/dashboardHeader";
import SpinnerLoader from "@/components/loaders/spinnerLoader";
import Stat from "@/components/stats/stat";
import { useNewsModalStore } from "@/lib/store";

import dynamic from "next/dynamic";
const LineChart = dynamic(() => import("@/components/charts/line/lineChart"), {
  ssr: false,
  loading: () => <SpinnerLoader />,
});
const BoxPlotChart = dynamic(() => import("@/components/charts/boxplot/boxPlot"), {
  ssr: false,
  loading: () => <SpinnerLoader />,
});

export default function Overview() {
  const { setSelectedNews } = useNewsModalStore();

  return (
    <>
      <DashboardHeader
        title="Overview"
        subtitle="Overview of Pakistan's Mutual Funds Industry"
        showBreadcrumbs={true}
        showLinks={false}
      />

      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Stat key={i} title="Total Page Views" value={89400} subtitle="21% more than last month" />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartCard
          title="Top Performing Funds"
          color="primary-gradient"
          subtitle="last updated 4h ago"
          Chart={LineChart}
          data={linechart_data}
          isDataLoaded={true}
        />

        <ChartCard
          title="Top Performing Categories"
          color="primary-gradient"
          subtitle="last updated 4h ago"
          Chart={BoxPlotChart}
          data={boxplot_data}
          isDataLoaded={true}
        />

        <NewsCard news={news} setSelectedNews={setSelectedNews} />
      </div>
    </>
  );
}
