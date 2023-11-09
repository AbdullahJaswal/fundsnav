const light_theme_colors = {
  primary: "#66cc8a",
  secondary: "#c9b74f",
  accent: "#ea5234",
  muted: "#94a3b8",
  neutral: "#b0b8b0",
  "base-100": "#FFFFFF",
  "base-200": "#fafafa",
  "base-300": "#edf2ed",
  legend_text_fill: "#777777",
  grid_color: "#dddddd",
  ticks_text_color: "#777777",
  info: "#3abff8",
  success: "#36d399",
  warning: "#fbbd23",
  error: "#f87272",
};
const dark_theme_colors = {
  primary: "#66cc8a",
  secondary: "#edd85f",
  accent: "#ea5234",
  muted: "#64748b",
  neutral: "#252525",
  "base-100": "#000000",
  "base-200": "#0c0c0c",
  "base-300": "#181818",
  legend_text_fill: "#dddddd",
  grid_color: "#1a1a25",
  ticks_text_color: "#dddddd",
  info: "#3abff8",
  success: "#36d399",
  warning: "#fbbd23",
  error: "#f87272",
};

const light_theme = {
  fontSize: 11,
  axis: {
    legend: {
      text: {
        fontSize: 12,
        fill: light_theme_colors.legend_text_fill,
      },
    },
    ticks: {
      line: {
        strokeWidth: 1,
      },
      text: {
        fontSize: 11,
        fill: light_theme_colors.ticks_text_color,
      },
    },
  },
  grid: {
    line: {
      stroke: light_theme_colors.grid_color,
      strokeWidth: 1,
    },
  },
  legends: {
    title: {
      text: {
        fill: light_theme_colors.muted,
      },
    },
    text: {
      fill: "#000000",
    },
    ticks: {
      text: {
        fill: light_theme_colors.muted,
      },
    },
  },
  annotations: {
    text: {
      fontSize: 13,
      fill: light_theme_colors.muted,
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
    link: {
      stroke: "#000000",
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
    outline: {
      stroke: "#000000",
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
    symbol: {
      fill: "#000000",
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
  },
  tooltip: {
    container: {
      background: "#ffffff",
      color: "#333333",
      fontSize: 12,
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {},
  },
};

const dark_theme = {
  fontSize: 11,
  axis: {
    legend: {
      text: {
        fontSize: 12,
        fill: dark_theme_colors.muted,
      },
    },
    ticks: {
      line: {
        strokeWidth: 1,
      },
      text: {
        fontSize: 11,
        fill: dark_theme_colors.muted,
      },
    },
  },
  grid: {
    line: {
      stroke: dark_theme_colors.grid_color,
      strokeWidth: 1,
    },
  },
  legends: {
    title: {
      text: {
        fill: dark_theme_colors.muted,
      },
    },
    text: {
      fill: "#ffffff",
    },
    ticks: {
      text: {
        fill: dark_theme_colors.muted,
      },
    },
  },
  annotations: {
    text: {
      fontSize: 13,
      fill: dark_theme_colors.muted,
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
    link: {
      stroke: "#000000",
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
    outline: {
      stroke: "#000000",
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
    symbol: {
      fill: "#000000",
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
  },
  tooltip: {
    container: {
      background: "#333333",
      color: "#ffffff",
      fontSize: 12,
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {},
  },
};

export { light_theme, dark_theme, light_theme_colors, dark_theme_colors };
