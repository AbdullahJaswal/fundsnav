export type Category = {
  name: string;
  slug: string;
  type: string;
};

export type FundType = {
  name: string;
  slug: string;
};

export type MarketCap = {
  month: string;
  cash: number;
  placements_with_banks_and_dfis: number;
  placements_with_nbfs: number;
  reverse_repos_against_government_securities: number;
  reverse_repos_against_all_other_securities: number;
  tfcs: number;
  government_backed_guaranteed_securities: number;
  equities: number;
  pibs: number;
  tbills: number;
  commercial_papers: number;
  spread_transactions: number;
  cfs_margin_financing: number;
  others_including_receivables: number;
  liabilities: number;
  total: number;
};

export type NAV = {
  fund_class: string;
  type: string;
  offer: number;
  repurchase: number;
  nav: number;
  front_end_load: number;
  back_end_load: number;
  contingent_load: number;
  trustee_code: string;
  validity_date: string;
};

export type AMC = {
  name: string;
  slug: string;
  description: string;
  color: string;
  funds?: Fund[];
};

export type Fund = {
  amc?: AMC;
  category: Category;
  fund_type: FundType;
  name: string;
  slug: string;
  inception_date: string;
  market_caps?: MarketCap[];
  last_updated_on: string | null;
};

export type ChartValue = {
  x: string;
  y: number;
};

export type FundsDistribution = {
  category_distribution: {
    Conventional: number;
    Islamic: number;
  };
  fund_type_distribution: {
    "Open End Schemes": number;
    "Closed End Schemes": number;
    "Exchange Traded Fund (ETF)": number;
    "Dedicated Equity Funds": number;
    "Voluntary Pension Funds": number;
  };
  amc_distribution: {
    [key: string]: {
      count: number;
      color: string;
    };
  };
};

export type FundsGrowth = {
  [key: string]: {
    growth: number;
    color: string;
  };
};
