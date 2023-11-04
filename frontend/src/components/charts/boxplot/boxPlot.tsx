// import { ResponsiveBoxPlot } from "@nivo/boxplot";
// import { dark_theme, light_theme } from "@/components/charts/chartTheme";
// import { useCurrentThemeStore } from "@/lib/store";

// type Props = {
//   data: any;
// };

// export default function BoxPlotChart({ data }: Props) {
//   const { currentTheme } = useCurrentThemeStore();
//   const chartTheme = currentTheme === "light" ? light_theme : dark_theme;

//   return (
//     <ResponsiveBoxPlot
//       data={data}
//       theme={chartTheme}
//       margin={{ top: 30, right: 60, bottom: 50, left: 80 }}
//       minValue={0}
//       maxValue={10}
//       subGroupBy="subgroup"
//       layout="horizontal"
//       padding={0.12}
//       enableGridX={false}
//       enableGridY={true}
//       axisTop={{
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: "",
//         legendOffset: 36,
//       }}
//       axisRight={{
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: "",
//         legendOffset: 0,
//       }}
//       axisBottom={{
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: "group",
//         legendPosition: "middle",
//         legendOffset: 32,
//       }}
//       axisLeft={{
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: "value",
//         legendPosition: "middle",
//         legendOffset: -60,
//       }}
//       colors={{ scheme: "nivo" }}
//       colorBy="group"
//       annotations={[
//         {
//           type: "rect",
//           match: {
//             group: "Beta",
//             subGroup: "A",
//           },
//           noteX: 0,
//           noteY: -20,
//           offset: 1,
//           noteTextOffset: 0,
//           noteWidth: 0,
//           note: "Beta A",
//         },
//       ]}
//       borderRadius={2}
//       borderWidth={2}
//       borderColor={{
//         from: "color",
//         modifiers: [["darker", 0.3]],
//       }}
//       medianWidth={2}
//       medianColor={{
//         from: "color",
//         modifiers: [["darker", 0.3]],
//       }}
//       whiskerEndSize={0.6}
//       whiskerColor={{
//         from: "color",
//         modifiers: [["darker", 0.3]],
//       }}
//       motionConfig="stiff"
//     />
//   );
// }
