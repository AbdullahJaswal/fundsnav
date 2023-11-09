import SpinnerLoader from "@/components/loaders/spinnerLoader";
import { LuServerCrash } from "react-icons/lu";
import { PiChartLineBold } from "react-icons/pi";

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
  highPrecision?: boolean;
  setHighPrecision?: any;
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
  highPrecision = false,
  setHighPrecision = null,
}: Props) {
  const title_color = TITLE_COLOR[color];

  return (
    <div className="card card-compact card-side min-h-[32rem] border bg-base-200/25 border-base-300 rounded-lg">
      <div className="card-body w-full">
        <h2 className={`card-title font-bold ${title_color} flex flex-col md:flex-row w-full`}>
          <span className="w-full">{title}</span>
          {subtitle && <span className="md:text-end text-xs text-muted w-full">{subtitle}</span>}
        </h2>

        {!error ? (
          <>
            {isDataLoaded ? (
              range && setRange ? (
                <div className="h-full drop-shadow-sm">
                  <Chart data={data} range={range} maxDate={maxDate} />
                </div>
              ) : (
                <div className="h-full drop-shadow-sm">
                  <Chart data={data} maxDate={maxDate} />
                </div>
              )
            ) : (
              <SpinnerLoader />
            )}

            {range && setRange && (
              <>
                <div className="border border-base-300 join w-full grid grid-cols-8 gap-1">
                  {["1w", "1m", "3m", "6m", "1y", "3y", "5y", "all"].map((label) => (
                    <input
                      key={label}
                      className={`join-item btn btn-sm !rounded-lg btn-ghost opacity-75 text-muted font-bold checked:btn-primary checked:opacity-100`}
                      type="radio"
                      name={title}
                      aria-label={label}
                      defaultChecked={label === "1m"}
                      onClick={() => {
                        setHighPrecision(false);
                        setRange(label);
                      }}
                    />
                  ))}
                </div>

                <div className="form-control w-max">
                  <label className="cursor-pointer label flex flex-row gap-4">
                    <span
                      className={`label-text font-bold flex flex-row items-center ${
                        highPrecision ? "text-warning" : "text-muted"
                      }`}
                    >
                      High Precision
                      <div className="dropdown dropdown-hover dropdown-right !z-50">
                        <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-warning">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </label>

                        <div
                          tabIndex={0}
                          className="bg-base-100 border border-base-300 card compact dropdown-content z-[1] shadow rounded-box w-64"
                        >
                          <div className="card-body">
                            <p>
                              <span
                                className="tooltip tooltip-warning text-warning tooltip-sm"
                                data-tip="High precision mode will show more data points on the chart."
                              >
                                <PiChartLineBold className="w-4 h-4 inline-block" />
                              </span>

                              <span className="ml-2 text-muted">
                                High precision mode will show more data points on the chart and may cause{" "}
                                <span className="underline">performance</span> issues.
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </span>

                    <input
                      type="checkbox"
                      className="checkbox checkbox-warning disabled"
                      checked={highPrecision}
                      onClick={() => setHighPrecision(!highPrecision)}
                      disabled={range !== "all" || !isDataLoaded}
                    />
                  </label>
                </div>
              </>
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
