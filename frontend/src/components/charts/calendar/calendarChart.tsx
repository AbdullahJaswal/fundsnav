import { useCurrentThemeStore } from "@/lib/store";
import { ResponsiveCalendar, ResponsiveCalendarCanvas } from "@nivo/calendar";
import { dark_theme, light_theme, light_theme_colors, dark_theme_colors } from "../chartTheme";
import Moment from "react-moment";
import moment from "moment";
import colors from "tailwindcss/colors";
import NoDataAvailable from "@/components/misc/noDataAvailable";

type Props = {
  data: any;
};

function getYearSpacing(day: number) {
  const years_gap = new Date().getFullYear() - new Date(day).getFullYear();

  switch (true) {
    case years_gap <= 3:
      return 28;
    case years_gap <= 5:
      return 48;
    default:
      return 4;
  }
}

export default function CalendarChart({ data }: Props) {
  const { currentTheme } = useCurrentThemeStore();
  const chartTheme = currentTheme === "light" ? light_theme : dark_theme;
  const chartColors = currentTheme === "light" ? light_theme_colors : dark_theme_colors;

  if (data.length === 0) {
    return <NoDataAvailable />;
  }

  const is_three_year_gap = new Date().getFullYear() - new Date(data?.[0]?.day).getFullYear() > 3;

  const common_props: any = {
    theme: chartTheme,
    direction: is_three_year_gap ? "vertical" : "horizontal",
    from: new Date(data?.[0]?.day).toISOString().slice(0, 10),
    to: new Date().toISOString().slice(0, 10),
    emptyColor: currentTheme === "light" ? colors.slate["200"] : colors.gray["900"],
    colors: [colors.red[500], colors.orange[500], colors.yellow[500], colors.lime[500], colors.green[500]],
    margin: { top: 20, right: 0, bottom: 20, left: 0 },
    monthBorderColor: chartColors["base-100"],
    dayBorderColor: chartColors["base-100"],
    yearSpacing: getYearSpacing(data?.[0]?.day),
    dayBorderWidth: is_three_year_gap ? 0.5 : 3,
    monthLegend: (year: number, month: number, date: Date) => (is_three_year_gap ? "" : moment(date).format("MMM")),
    minValue: "auto",
    maxValue: "auto",
    tooltip: ({ day, value, color }: any) => (
      <div className="p-2 flex flex-col gap-1 rounded-lg bg-base-200 border border-base-300 font-bold !z-50">
        <Moment format="D MMM YYYY" className="text-muted text-xs">
          {day}
        </Moment>

        <span style={{ color }}>PKR {value}</span>
      </div>
    ),
  };

  if (!is_three_year_gap) {
    return <ResponsiveCalendar {...common_props} data={data} />;
  }

  return <ResponsiveCalendarCanvas {...common_props} data={data} />;
}
