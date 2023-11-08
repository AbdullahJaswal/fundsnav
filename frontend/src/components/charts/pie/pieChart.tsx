import { useCurrentThemeStore } from "@/lib/store";
import { ResponsivePie } from "@nivo/pie";
import { dark_theme, light_theme, light_theme_colors, dark_theme_colors } from "../chartTheme";
import truncateEllipses from "@/common/utils/truncateEllipsis";

type Props = {
  data: any;
};

export default function PieChart({ data }: Props) {
  const { currentTheme } = useCurrentThemeStore();
  const chartTheme = currentTheme === "light" ? light_theme : dark_theme;

  return (
    <ResponsivePie
      data={data}
      theme={chartTheme}
      colors={(d: any) => d.data.color}
      startAngle={0}
      endAngle={360}
      margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
      innerRadius={0.75}
      padAngle={1}
      cornerRadius={4}
      activeInnerRadiusOffset={6}
      activeOuterRadiusOffset={6}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabel={(d: any) => truncateEllipses(d.label)}
      arcLinkLabelsSkipAngle={20}
      arcLinkLabelsTextColor={currentTheme === "light" ? light_theme_colors.muted : dark_theme_colors.muted}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={20}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      tooltip={({ datum }: any) => {
        return (
          <div className="flex flex-col gap-2 font-bold p-2 rounded-lg !z-50 bg-base-200 border border-base-300">
            <div className="flex flex-row items-center">
              <div className="w-2 h-2 mr-2 rounded-full" style={{ backgroundColor: datum.data.color }}></div>
              <div className="text-xs font-semibold">{datum.data.label}</div>
            </div>
            <div className="text-xs font-semibold">{datum.data.value} Funds</div>
          </div>
        );
      }}
    />
  );
}
