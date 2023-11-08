import {
  TbLayoutDashboard,
  TbChartAreaLine,
  TbTrendingUp,
  TbAdjustmentsSearch,
  TbChartPie,
  TbChartArrowsVertical,
  TbFilterSearch,
  TbCategory2,
  TbBuildingBank,
  TbBrandSpeedtest,
  TbAlertOctagon,
  TbBook,
  TbTools,
  TbUserSquare,
  TbHelpCircle,
  TbInfoCircle,
} from "react-icons/tb";

import { BsCashStack } from "react-icons/bs";
import { BiSolidContact } from "react-icons/bi";

export type SidebarItemType = {
  name: string;
  icon?: any;
  href: string;
  subitems?: SidebarItemType[];
};

const SideBarItems: SidebarItemType[] = [
  /* {
    name: "Overview",
    icon: TbLayoutDashboard,
    href: "/dashboard/overview",
  }, */
  /* {
    name: "Stock Analysis",
    icon: TbChartAreaLine,
    href: "/dashboard/stock-analysis",
    subitems: [
      {
        name: "Daily Stock Trends",
        icon: TbTrendingUp,
        href: "/dashboard/stock-analysis/daily-trends",
      },
      {
        name: "Stock Lookup",
        icon: TbAdjustmentsSearch,
        href: "/dashboard/stock-analysis/lookup",
      },
      {
        name: "Sector Analysis",
        icon: TbChartPie,
        href: "/dashboard/stock-analysis/sectors",
      },
    ],
  }, */
  {
    name: "Mutual Funds",
    icon: BsCashStack,
    href: "/dashboard/mutual-funds",
    /* subitems: [
      {
        name: "Fund Rankings",
        icon: TbChartArrowsVertical,
        href: "/dashboard/mutual-funds/rankings",
      },
      {
        name: "Fund Lookup",
        icon: TbFilterSearch,
        href: "/dashboard/mutual-funds/lookup",
      },
      {
        name: "Category Analysis",
        icon: TbCategory2,
        href: "/dashboard/mutual-funds/categories",
      },
    ], */
  },
  /* {
    name: "Portfolio",
    icon: TbBuildingBank,
    href: "/dashboard/portfolio",
    subitems: [
      {
        name: "My Portfolio",
        icon: TbBuildingBank,
        href: "/dashboard/portfolio",
      },
      {
        name: "Portfolio Performance",
        icon: TbBrandSpeedtest,
        href: "/dashboard/portfolio/performance",
      },
      {
        name: "Alerts",
        icon: TbAlertOctagon,
        href: "/dashboard/portfolio/alerts",
      },
    ],
  },
  {
    name: "Research & Insights",
    icon: TbBook,
    href: "/dashboard/research",
  },
  {
    name: "Tools & Calculators",
    icon: TbTools,
    href: "/dashboard/tools",
  },
  {
    name: "Profile & Settings",
    icon: TbUserSquare,
    href: "/dashboard/settings",
  },
  {
    name: "Help & Support",
    icon: TbHelpCircle,
    href: "/dashboard/support",
  },
  {
    name: "Contact",
    icon: BiSolidContact,
    href: "/contact",
  }, */
  {
    name: "About",
    icon: TbInfoCircle,
    href: "/about",
  },
];

export default SideBarItems;
