import { ResponsiveLine, ResponsiveLineCanvas } from "@nivo/line";
import { dark_theme, light_theme } from "@/components/charts/chartTheme";
// import { light_theme_colors, dark_theme_colors } from "@/components/charts/chartTheme";
import getFormatProperties from "@/components/charts/line/lineChartFormatter";
import { useCurrentThemeStore } from "@/lib/store";
import Moment from "react-moment";
import NoDataAvailable from "@/components/misc/noDataAvailable";

type Props = {
  data: any;
  range: string;
  maxDate?: Date | string;
};

export default function LineChart({ data, range = "1m", maxDate = "auto" }: Props) {
  const { currentTheme } = useCurrentThemeStore();
  const chartTheme = currentTheme === "light" ? light_theme : dark_theme;
  // const chartColor = currentTheme === "light" ? light_theme_colors.primary : dark_theme_colors.primary;

  const format = getFormatProperties(range, data[0].x);

  if (data?.[0]?.data?.length === 0) {
    return <NoDataAvailable />;
  }

  return (
    <ResponsiveLine
      data={data}
      theme={chartTheme}
      colors={(d) => d.color}
      // colors={chartColor}
      curve="monotoneX"
      margin={{ top: 30, right: 20, bottom: 40, left: 50 }}
      xScale={{
        format: "%Y-%m-%d",
        precision: "day",
        type: "time",
        useUTC: false,
        max: maxDate,
      }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      xFormat="time:%Y-%m-%d"
      axisTop={null}
      axisRight={null}
      enableGridY={false}
      animate
      axisBottom={{
        format: format.format,
        legend: "Date",
        legendOffset: 30,
        tickValues: format.tickValues,
        legendPosition: "middle",
      }}
      axisLeft={{
        legend: "NAV",
        legendOffset: -45,
        legendPosition: "middle",
        tickValues: 5,
      }}
      pointSize={10}
      enablePoints={format.enablePoints}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      lineWidth={format.lineWidth}
      tooltip={({ point }) => (
        <div className="bg-base-200 border border-base-300 rounded-md p-2 z-50">
          <div className="text-xs text-muted">
            <Moment date={point.data.xFormatted} format="DD MMM YYYY" />
          </div>
          <div className="text-sm font-bold text-primary">PKR {point.data.yFormatted}</div>
        </div>
      )}
    />
  );
}
