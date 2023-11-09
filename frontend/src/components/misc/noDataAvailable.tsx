import { PiChartLineBold } from "react-icons/pi";

export default function NoDataAvailable() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full text-muted-light font-bold drop-shadow-xs">
      <PiChartLineBold className="w-32 h-32" />
      No data available
    </div>
  );
}
