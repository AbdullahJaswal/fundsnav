type FormatResult = {
  format: string;
  tickValues: string;
  enablePoints: boolean;
  lineWidth: number;
};

const formats: Record<string, FormatResult> = {
  "1w": { format: "%b %d", tickValues: "every day", enablePoints: false, lineWidth: 3 },
  "1m": { format: "%b %d", tickValues: "every week", enablePoints: false, lineWidth: 3 },
  "3m": { format: "%b %d", tickValues: "every 2 weeks", enablePoints: false, lineWidth: 3 },
  "6m": { format: "%b", tickValues: "every month", enablePoints: false, lineWidth: 3 },
  "1y": { format: "%b", tickValues: "every month", enablePoints: false, lineWidth: 3 },
  "3y": { format: "%Y", tickValues: "every year", enablePoints: false, lineWidth: 2 },
  "5y": { format: "%Y", tickValues: "every year", enablePoints: false, lineWidth: 2 },
};

function getFormatProperties(range: string, init_date: string): FormatResult {
  if (range === "all") {
    const starting_date = new Date(init_date as string);
    const today = new Date();
    const tickValues = today.getFullYear() - starting_date.getFullYear() <= 10 ? "every 2 years" : "every 5 years";

    return { format: "%Y", tickValues, enablePoints: false, lineWidth: 2 };
  }

  return formats[range] || { format: "%b %d", tickValues: "every week", enablePoints: false, lineWidth: 3 };
}

export default getFormatProperties;
