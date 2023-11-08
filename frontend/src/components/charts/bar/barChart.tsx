import { useCurrentThemeStore } from "@/lib/store";
import { ResponsiveBar } from "@nivo/bar";
import { dark_theme, light_theme } from "../chartTheme";
import truncateEllipses from "@/common/utils/truncateEllipsis";

type Props = {
  data: any;
};

export default function BarChart({ data }: Props) {
  const { currentTheme } = useCurrentThemeStore();
  const chartTheme = currentTheme === "light" ? light_theme : dark_theme;

  return (
    <ResponsiveBar
      data={data}
      theme={chartTheme}
      indexBy="fund"
      margin={{ top: 10, right: 10, bottom: 40, left: 50 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={(d: any) => d.data.color}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        // tickSize: 5,
        // tickPadding: 5,
        tickRotation: 0,
        legend: "Fund",
        legendPosition: "middle",
        // legendOffset: 32,
        tickSize: 0,
        tickPadding: 0,
        legendOffset: 15,
        format: (tick: any) => {
          return "";
        },
        /* renderTick: (tick: any) => {
          return (
            <g transform={`translate(${tick.x},${tick.y + 12})`}>
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                className='text-xxs'
                style={{
                  fill: chartTheme.axis.ticks.text.fill,
                }}
              >
                {truncateEllipses(tick.value, 6)}
              </text>
            </g>
          )
        } */
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "% Change",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      tooltip={({ value, color, indexValue: label }) => {
        let value_color = "text-base-content";

        if (value < 0) {
          value_color = "text-red-500";
        } else if (value > 0) {
          value_color = "text-green-500";
        }

        return (
          <div className="bg-base-200 border border-base-300 shadow-lg rounded-lg p-2 font-bold !z-50">
            <div className="flex flex-row items-center">
              <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: color }} />
              <div className="text-sm font-semibold">{label}</div>
            </div>
            <div className={`text-sm font-semibold ${value_color}`}>{value}%</div>
          </div>
        );
      }}
    />
  );
}
