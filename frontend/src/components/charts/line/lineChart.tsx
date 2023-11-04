import { ResponsiveLine } from "@nivo/line";
import { dark_theme, light_theme } from "@/components/charts/chartTheme";
import getFormatProperties from "@/components/charts/line/lineChartFormatter";
import { useCurrentThemeStore } from "@/lib/store";
import { PiChartLineBold } from "react-icons/pi";
import Moment from "react-moment";

type Props = {
  data: any;
  range: string;
  maxDate?: Date | string;
};

export default function LineChart({ data, range = "1m", maxDate = "auto" }: Props) {
  const { currentTheme } = useCurrentThemeStore();
  const chartTheme = currentTheme === "light" ? light_theme : dark_theme;

  const format = getFormatProperties(range, data[0].x);

  return (
    <div className="h-full drop-shadow-sm">
      {data?.[0]?.data?.length > 0 ? (
        <ResponsiveLine
          data={data}
          theme={chartTheme}
          // colors={d => d.color}
          colors={{ scheme: "yellow_green" }}
          curve="monotoneX"
          margin={{ top: 30, right: 10, bottom: 40, left: 50 }}
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
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center h-full text-muted-light font-bold drop-shadow-xs">
          <PiChartLineBold className="w-32 h-32" />
          No data available
        </div>
      )}
    </div>
  );
}
