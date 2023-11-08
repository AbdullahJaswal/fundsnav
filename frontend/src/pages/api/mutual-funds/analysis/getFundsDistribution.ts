import { FundsDistribution } from "@/common/types/mutual_funds/mutualFunds";

export default async function getFundsDistribution(access_token: string): Promise<FundsDistribution> {
  try {
    const url = `${process.env.NEXT_PRIVATE_API_URL}/mutual-funds/analysis/funds-distribution/`;

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
