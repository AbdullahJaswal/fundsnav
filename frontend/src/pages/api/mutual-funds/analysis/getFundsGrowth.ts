import { FundsGrowth } from "@/common/types/mutual_funds/mutualFunds";

export default async function getFundsGrowth(access_token: string): Promise<FundsGrowth> {
  try {
    const url = `${process.env.NEXT_PRIVATE_API_URL}/mutual-funds/analysis/funds-growth/`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    return res.json();
  } catch (error) {
    throw error;
  }
}
