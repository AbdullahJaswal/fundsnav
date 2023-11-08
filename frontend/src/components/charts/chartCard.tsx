import SpinnerLoader from "@/components/loaders/spinnerLoader";
import { LuServerCrash } from "react-icons/lu";

const TITLE_COLOR = {
  primary: "text-primary",
  "primary-gradient": "text-gradient-primary",
  secondary: "text-secondary",
  "secondary-gradient": "text-gradient-secondary",
  accent: "text-accent",
  "accent-gradient": "text-gradient-accent",
  neutral: "text-neutral",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  info: "text-info",
};

type Props = {
  title: string;
  color?: keyof typeof TITLE_COLOR;
  subtitle?: string;
  Chart: any;
  data: any;
  isDataLoaded: boolean;
  range?: string;
  setRange?: any;
  maxDate?: Date | string;
  error?: any;
};

export default function ChartCard({
  title,
  color = "primary-gradient",
  subtitle = "",
  Chart,
  data,
  isDataLoaded,
  range = "1m",
  setRange = null,
  maxDate = "auto",
  error = null,
}: Props) {
  const title_color = TITLE_COLOR[color];

  return (
    <div className="card card-compact card-side min-h-[28rem] border bg-base-200/25 border-base-300 rounded-lg">
      <div className="card-body w-full">
        <h2 className={`card-title font-bold ${title_color} flex flex-col md:flex-row w-full`}>
          <span className="w-full">{title}</span>
          {subtitle && <span className="md:text-end text-xs text-muted w-full">{subtitle}</span>}
        </h2>

        {!error ? (
          <>
            {isDataLoaded ? (
              range && setRange ? (
                <Chart data={data} range={range} maxDate={maxDate} />
              ) : (
                <Chart data={data} maxDate={maxDate} />
              )
            ) : (
              <SpinnerLoader />
            )}

            {range && setRange && (
              <div className="join w-full px-12 grid grid-cols-8 gap-1">
                {["1w", "1m", "3m", "6m", "1y", "3y", "5y", "all"].map((label) => (
                  <input
                    key={label}
                    className={`join-item btn btn-sm !rounded-lg btn-ghost opacity-75 checked:btn-primary checked:opacity-100`}
                    type="radio"
                    name={title}
                    aria-label={label}
                    defaultChecked={label === "1m"}
                    onClick={() => setRange(label)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center h-full text-muted-light font-bold drop-shadow-xs">
            <LuServerCrash className="w-32 h-32" />
            Oops... Something went wrong.
          </div>
        )}
      </div>
    </div>
  );
}
